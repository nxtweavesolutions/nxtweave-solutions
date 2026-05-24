// src/pages/AdminDashboard.jsx  —  NxtWeave Solutions (complete final)
import { useEffect, useState, useMemo, useCallback } from "react";
import { signOut }                                   from "firebase/auth";
import { useNavigate }                               from "react-router-dom";
import {
  collection, query, orderBy, onSnapshot,
  doc, updateDoc, deleteDoc, serverTimestamp,
} from "firebase/firestore";
import { auth, db } from "../firebase";

// ─── Constants ────────────────────────────────────────────────────────────────
const COLLECTIONS = { contacts: "contacts", queries: "queries" };

const STATUS_CONFIG = {
  pending:   { label: "Pending",   bg: "#FFF7ED", color: "#C2410C", dot: "#F97316" },
  contacted: { label: "Contacted", bg: "#EFF6FF", color: "#1D4ED8", dot: "#3B82F6" },
  resolved:  { label: "Resolved",  bg: "#F0FDF4", color: "#15803D", dot: "#22C55E" },
  closed:    { label: "Closed",    bg: "#F9FAFB", color: "#6B7280", dot: "#9CA3AF" },
};

const SOURCE_LABELS = {
  "hero-form":      "Hero Form",
  "popup":          "Popup",
  "service-modal":  "Service Modal",
  "contact-page":   "Contact Page",
  "unknown":        "Unknown",
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
function formatDate(ts) {
  if (!ts) return "—";
  const d = ts.toDate ? ts.toDate() : new Date(ts);
  return d.toLocaleString("en-IN", {
    day: "2-digit", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
}

function exportCSV(rows, filename) {
  const headers = ["Name","Phone","Email","Service","Message","Source","Status","Date"];
  const lines = [
    headers.join(","),
    ...rows.map((r) => [
      r.name    || "",
      r.phone   || "",
      r.email   || "",
      r.service || "",
      (r.message || "").replace(/,/g, ";"),
      r.source  || "",
      r.status  || "",
      formatDate(r.createdAt),
    ].map((v) => `"${v}"`).join(",")),
  ];
  const blob = new Blob([lines.join("\n")], { type: "text/csv" });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement("a");
  a.href     = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatCard({ label, value, sub, color = "#1E3A5F", bg = "#F4F8FB", icon }) {
  return (
    <div style={{
      background: "#fff", borderRadius: "16px", padding: "20px 24px",
      border: "1px solid #e0e9f2", boxShadow: "0 1px 6px rgba(0,0,0,0.04)",
      display: "flex", alignItems: "flex-start", gap: "14px",
    }}>
      <div style={{
        width: "44px", height: "44px", borderRadius: "12px",
        background: bg, display: "flex", alignItems: "center",
        justifyContent: "center", fontSize: "20px", flexShrink: 0,
      }}>{icon}</div>
      <div>
        <div style={{ fontSize: "1.7rem", fontWeight: 800, color, lineHeight: 1,
          fontFamily: "'Playfair Display',serif" }}>{value}</div>
        <div style={{ fontSize: "0.82rem", fontWeight: 600, color: "#1E3A5F",
          marginTop: "3px" }}>{label}</div>
        {sub && <div style={{ fontSize: "0.72rem", color: "#8FA3B4",
          marginTop: "2px" }}>{sub}</div>}
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.pending;
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: "5px",
      padding: "3px 10px", borderRadius: "50px",
      background: cfg.bg, color: cfg.color,
      fontSize: "0.72rem", fontWeight: 700,
    }}>
      <span style={{ width: "6px", height: "6px", borderRadius: "50%",
        background: cfg.dot, flexShrink: 0 }} />
      {cfg.label}
    </span>
  );
}

function DetailModal({ entry, onClose, onStatusChange, onDelete }) {
  if (!entry) return null;
  return (
    <div onClick={onClose} style={{
      position: "fixed", inset: 0, zIndex: 9999,
      background: "rgba(13,31,51,0.72)", backdropFilter: "blur(4px)",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "16px",
    }}>
      <div onClick={(e) => e.stopPropagation()} style={{
        background: "#fff", borderRadius: "24px", width: "100%",
        maxWidth: "560px", maxHeight: "90vh", overflowY: "auto",
        boxShadow: "0 32px 80px rgba(13,31,51,0.28)",
      }}>
        {/* Header */}
        <div style={{
          background: "linear-gradient(135deg,#1E3A5F,#2FA4C7)",
          padding: "24px 28px", borderRadius: "24px 24px 0 0",
          display: "flex", justifyContent: "space-between", alignItems: "center",
        }}>
          <div>
            <h3 style={{ color: "#fff", fontFamily: "'Playfair Display',serif",
              fontWeight: 700, fontSize: "1.1rem" }}>{entry.name || "No name"}</h3>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.8rem",
              marginTop: "2px" }}>{formatDate(entry.createdAt)}</p>
          </div>
          <button onClick={onClose} style={{
            background: "rgba(255,255,255,0.15)", border: "none",
            width: "32px", height: "32px", borderRadius: "50%",
            color: "#fff", cursor: "pointer", fontSize: "18px",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>&times;</button>
        </div>

        {/* Body */}
        <div style={{ padding: "24px 28px", display: "flex",
          flexDirection: "column", gap: "14px" }}>
          {[
            { label: "📞 Phone",   value: entry.phone },
            { label: "📧 Email",   value: entry.email },
            { label: "🛠 Service", value: entry.service },
            { label: "📌 Source",  value: SOURCE_LABELS[entry.source] || entry.source },
          ].map(({ label, value }) => value ? (
            <div key={label} style={{ display: "flex", gap: "12px",
              padding: "12px 16px", background: "#F4F8FB",
              borderRadius: "10px" }}>
              <span style={{ fontSize: "0.78rem", color: "#8FA3B4",
                fontWeight: 600, minWidth: "90px" }}>{label}</span>
              <span style={{ fontSize: "0.85rem", color: "#1E3A5F",
                fontWeight: 500 }}>{value}</span>
            </div>
          ) : null)}

          {entry.message && (
            <div style={{ padding: "14px 16px", background: "#F4F8FB",
              borderRadius: "10px" }}>
              <div style={{ fontSize: "0.78rem", color: "#8FA3B4",
                fontWeight: 600, marginBottom: "6px" }}>💬 Message</div>
              <p style={{ fontSize: "0.85rem", color: "#556B7D",
                lineHeight: 1.7 }}>{entry.message}</p>
            </div>
          )}

          {/* Status change */}
          <div style={{ display: "flex", alignItems: "center",
            gap: "10px", marginTop: "4px" }}>
            <span style={{ fontSize: "0.82rem", color: "#556B7D",
              fontWeight: 600 }}>Status:</span>
            <select
              value={entry.status || "pending"}
              onChange={(e) => onStatusChange(entry, e.target.value)}
              style={{
                padding: "8px 14px", borderRadius: "8px",
                border: "1.5px solid #e0e9f2", fontSize: "0.85rem",
                fontFamily: "inherit", color: "#1E3A5F",
                background: "#fff", cursor: "pointer", outline: "none",
              }}
            >
              {Object.entries(STATUS_CONFIG).map(([k, v]) => (
                <option key={k} value={k}>{v.label}</option>
              ))}
            </select>
          </div>

          {/* Actions */}
          <div style={{ display: "flex", gap: "10px", marginTop: "4px" }}>
            {entry.phone && (
              <a href={`tel:${entry.phone}`} style={{
                flex: 1, display: "flex", alignItems: "center",
                justifyContent: "center", gap: "6px",
                padding: "11px", borderRadius: "10px",
                background: "linear-gradient(135deg,#1E3A5F,#2FA4C7)",
                color: "#fff", fontWeight: 600, fontSize: "0.85rem",
                textDecoration: "none",
              }}>📞 Call</a>
            )}
            {entry.phone && (
              <a href={`https://wa.me/91${entry.phone.replace(/\D/g,"")}`}
                target="_blank" rel="noreferrer"
                style={{
                  flex: 1, display: "flex", alignItems: "center",
                  justifyContent: "center", gap: "6px",
                  padding: "11px", borderRadius: "10px",
                  background: "rgba(37,211,102,0.12)",
                  border: "1px solid rgba(37,211,102,0.3)",
                  color: "#22C55E", fontWeight: 600, fontSize: "0.85rem",
                  textDecoration: "none",
                }}>💬 WhatsApp</a>
            )}
            {entry.email && (
              <a href={`mailto:${entry.email}`} style={{
                flex: 1, display: "flex", alignItems: "center",
                justifyContent: "center", gap: "6px",
                padding: "11px", borderRadius: "10px",
                background: "#F4F8FB", border: "1px solid #e0e9f2",
                color: "#556B7D", fontWeight: 600, fontSize: "0.85rem",
                textDecoration: "none",
              }}>✉️ Email</a>
            )}
          </div>

          <button onClick={() => { onDelete(entry); onClose(); }}
            style={{
              padding: "11px", borderRadius: "10px", border: "none",
              background: "#FEF2F2", color: "#DC2626",
              fontWeight: 600, fontSize: "0.85rem", cursor: "pointer",
              fontFamily: "inherit",
            }}>
            🗑 Delete Entry
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Dashboard ───────────────────────────────────────────────────────────
export default function AdminDashboard() {
  const navigate = useNavigate();

  const [contacts,  setContacts]  = useState([]);
  const [queries,   setQueries]   = useState([]);
  const [loading,   setLoading]   = useState(true);
  const [activeTab, setActiveTab] = useState("all");   // all | contacts | queries
  const [search,    setSearch]    = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selected,  setSelected]  = useState(null);    // detail modal
  const [toast,     setToast]     = useState(null);    // { msg, type }

  // ── Real-time listeners ──────────────────────────────────────────────────
  useEffect(() => {
    const q1 = query(collection(db, COLLECTIONS.contacts), orderBy("createdAt","desc"));
    const q2 = query(collection(db, COLLECTIONS.queries),  orderBy("createdAt","desc"));

    const u1 = onSnapshot(q1, (snap) => {
      setContacts(snap.docs.map((d) => ({ id: d.id, _col: COLLECTIONS.contacts, ...d.data() })));
      setLoading(false);
    }, (err) => { console.error(err); setLoading(false); });

    const u2 = onSnapshot(q2, (snap) => {
      setQueries(snap.docs.map((d) => ({ id: d.id, _col: COLLECTIONS.queries, ...d.data() })));
    }, console.error);

    return () => { u1(); u2(); };
  }, []);

  // ── Toast helper ─────────────────────────────────────────────────────────
  const showToast = useCallback((msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  }, []);

  // ── Update status ────────────────────────────────────────────────────────
  const handleStatusChange = useCallback(async (entry, newStatus) => {
    try {
      await updateDoc(doc(db, entry._col, entry.id), {
        status: newStatus, updatedAt: serverTimestamp(),
      });
      // Update selected if open
      setSelected((prev) => prev?.id === entry.id
        ? { ...prev, status: newStatus } : prev);
      showToast("Status updated");
    } catch { showToast("Update failed", "error"); }
  }, [showToast]);

  // ── Delete entry ─────────────────────────────────────────────────────────
  const handleDelete = useCallback(async (entry) => {
    if (!window.confirm(`Delete entry from ${entry.name || "this contact"}?`)) return;
    try {
      await deleteDoc(doc(db, entry._col, entry.id));
      showToast("Entry deleted");
    } catch { showToast("Delete failed", "error"); }
  }, [showToast]);

  // ── Logout ────────────────────────────────────────────────────────────────
  const handleLogout = async () => {
    await signOut(auth);
    navigate("/admin");
  };

  // ── Merged + filtered data ────────────────────────────────────────────────
  const allData = useMemo(() => {
    const merged = [...contacts, ...queries].sort((a, b) => {
      const ta = a.createdAt?.toDate?.() || new Date(a.createdAt || 0);
      const tb = b.createdAt?.toDate?.() || new Date(b.createdAt || 0);
      return tb - ta;
    });
    return merged;
  }, [contacts, queries]);

  const displayData = useMemo(() => {
    let rows = activeTab === "contacts" ? contacts
             : activeTab === "queries"  ? queries
             : allData;

    if (statusFilter !== "all") {
      rows = rows.filter((r) => (r.status || "pending") === statusFilter);
    }

    if (search.trim()) {
      const s = search.toLowerCase();
      rows = rows.filter((r) =>
        [r.name, r.phone, r.email, r.service, r.message, r.source]
          .some((f) => (f || "").toLowerCase().includes(s))
      );
    }
    return rows;
  }, [allData, contacts, queries, activeTab, statusFilter, search]);

  // ── Stats ─────────────────────────────────────────────────────────────────
  const stats = useMemo(() => ({
    total:     allData.length,
    pending:   allData.filter((r) => !r.status || r.status === "pending").length,
    contacted: allData.filter((r) => r.status === "contacted").length,
    resolved:  allData.filter((r) => r.status === "resolved").length,
    today:     allData.filter((r) => {
      const d = r.createdAt?.toDate?.() || new Date(r.createdAt || 0);
      const now = new Date();
      return d.toDateString() === now.toDateString();
    }).length,
  }), [allData]);

  // ── Render ────────────────────────────────────────────────────────────────
  if (loading) return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center",
      justifyContent: "center", background: "#F4F8FB" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ width: "40px", height: "40px", borderRadius: "50%",
          border: "3px solid #e0e9f2", borderTopColor: "#2FA4C7",
          animation: "spin 0.8s linear infinite", margin: "0 auto 16px" }} />
        <p style={{ color: "#8FA3B4", fontSize: "0.85rem" }}>Loading dashboard…</p>
        <style>{`@keyframes spin{from{transform:rotate(0)}to{transform:rotate(360deg)}}`}</style>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: "#F4F8FB",
      fontFamily: "'DM Sans',sans-serif" }}>
      <style>{`
        @keyframes spin { from{transform:rotate(0)} to{transform:rotate(360deg)} }
        @keyframes toastIn { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:none} }
        .row-hover:hover { background: #F4F8FB !important; cursor: pointer; }
        @media(max-width:768px){
          .dash-stats { grid-template-columns: 1fr 1fr !important; }
          .dash-table  { font-size: 0.78rem !important; }
          .dash-col-hide { display: none !important; }
        }
        @media(max-width:480px){
          .dash-stats { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* ── Top bar ──────────────────────────────────────────────────────── */}
      <div style={{
        background: "linear-gradient(135deg,#0D1F33,#1E3A5F)",
        padding: "16px 24px",
        display: "flex", alignItems: "center",
        justifyContent: "space-between", gap: "16px",
        flexWrap: "wrap",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{
            width: "38px", height: "38px", borderRadius: "10px",
            background: "linear-gradient(135deg,#C8A96E,#E8C87E)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontWeight: 900, fontSize: "12px", color: "#0D1F33",
            fontFamily: "'Montserrat',sans-serif",
          }}>NW</div>
          <div>
            <div style={{ color: "#fff", fontFamily: "'Playfair Display',serif",
              fontWeight: 700, fontSize: "1.1rem" }}>Admin Dashboard</div>
            <div style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.72rem" }}>
              NxtWeave Solutions</div>
          </div>
        </div>

        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <button
            onClick={() => exportCSV(displayData, `nxtweave-leads-${Date.now()}.csv`)}
            style={{
              padding: "8px 16px", borderRadius: "8px",
              background: "rgba(47,164,199,0.15)",
              border: "1px solid rgba(47,164,199,0.3)",
              color: "#2FA4C7", fontWeight: 600, fontSize: "0.82rem",
              cursor: "pointer", fontFamily: "inherit",
              display: "flex", alignItems: "center", gap: "6px",
            }}
          >
            ⬇ Export CSV
          </button>
          <button
            onClick={handleLogout}
            style={{
              padding: "8px 16px", borderRadius: "8px",
              background: "rgba(239,68,68,0.15)",
              border: "1px solid rgba(239,68,68,0.3)",
              color: "#F87171", fontWeight: 600, fontSize: "0.82rem",
              cursor: "pointer", fontFamily: "inherit",
            }}
          >
            Logout
          </button>
        </div>
      </div>

      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "28px 24px" }}>

        {/* ── Stats ──────────────────────────────────────────────────────── */}
        <div className="dash-stats" style={{
          display: "grid", gridTemplateColumns: "repeat(5,1fr)",
          gap: "14px", marginBottom: "28px",
        }}>
          <StatCard label="Total Leads"  value={stats.total}
            icon="📋" bg="rgba(47,164,199,0.1)"  color="#1E3A5F" />
          <StatCard label="Pending"      value={stats.pending}
            icon="⏳" bg="rgba(249,115,22,0.1)" color="#C2410C"
            sub="Needs follow-up" />
          <StatCard label="Contacted"    value={stats.contacted}
            icon="📞" bg="rgba(59,130,246,0.1)" color="#1D4ED8" />
          <StatCard label="Resolved"     value={stats.resolved}
            icon="✅" bg="rgba(34,197,94,0.1)"  color="#15803D" />
          <StatCard label="Today"        value={stats.today}
            icon="📅" bg="rgba(168,85,247,0.1)" color="#7C3AED"
            sub="New enquiries" />
        </div>

        {/* ── Tabs + Search + Filter ──────────────────────────────────────── */}
        <div style={{
          background: "#fff", borderRadius: "16px",
          border: "1px solid #e0e9f2", overflow: "hidden",
          boxShadow: "0 1px 6px rgba(0,0,0,0.04)",
        }}>

          {/* Toolbar */}
          <div style={{
            padding: "16px 20px",
            display: "flex", alignItems: "center",
            gap: "12px", flexWrap: "wrap",
            borderBottom: "1px solid #e0e9f2",
          }}>
            {/* Tabs */}
            <div style={{ display: "flex", gap: "6px" }}>
              {[
                { key: "all",      label: `All (${allData.length})` },
                { key: "contacts", label: `Contacts (${contacts.length})` },
                { key: "queries",  label: `Queries (${queries.length})` },
              ].map((t) => (
                <button key={t.key} onClick={() => setActiveTab(t.key)}
                  style={{
                    padding: "7px 14px", borderRadius: "8px", border: "none",
                    fontWeight: 600, fontSize: "0.82rem",
                    cursor: "pointer", fontFamily: "inherit",
                    background: activeTab === t.key ? "#1E3A5F" : "#F4F8FB",
                    color:      activeTab === t.key ? "#fff"    : "#556B7D",
                    transition: "all 0.2s",
                  }}
                >{t.label}</button>
              ))}
            </div>

            {/* Search */}
            <input
              placeholder="🔍  Search name, phone, email…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                flex: 1, minWidth: "200px",
                padding: "8px 14px", borderRadius: "8px",
                border: "1.5px solid #e0e9f2", fontSize: "0.85rem",
                fontFamily: "inherit", color: "#1E3A5F", outline: "none",
              }}
              onFocus={(e) => e.target.style.borderColor = "#2FA4C7"}
              onBlur={(e)  => e.target.style.borderColor = "#e0e9f2"}
            />

            {/* Status filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              style={{
                padding: "8px 14px", borderRadius: "8px",
                border: "1.5px solid #e0e9f2", fontSize: "0.85rem",
                fontFamily: "inherit", color: "#1E3A5F",
                background: "#fff", cursor: "pointer", outline: "none",
              }}
            >
              <option value="all">All Status</option>
              {Object.entries(STATUS_CONFIG).map(([k, v]) => (
                <option key={k} value={k}>{v.label}</option>
              ))}
            </select>

            {/* Clear filters */}
            {(search || statusFilter !== "all") && (
              <button onClick={() => { setSearch(""); setStatusFilter("all"); }}
                style={{
                  padding: "8px 12px", borderRadius: "8px",
                  background: "#FEF2F2", border: "none",
                  color: "#DC2626", fontWeight: 600, fontSize: "0.78rem",
                  cursor: "pointer", fontFamily: "inherit",
                }}>
                ✕ Clear
              </button>
            )}
          </div>

          {/* ── Table ──────────────────────────────────────────────────────── */}
          {displayData.length === 0 ? (
            <div style={{ padding: "60px 24px", textAlign: "center" }}>
              <div style={{ fontSize: "2.5rem", marginBottom: "12px" }}>📭</div>
              <p style={{ color: "#8FA3B4", fontSize: "0.9rem" }}>
                No entries found{search ? ` for "${search}"` : ""}.
              </p>
            </div>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table className="dash-table" style={{
                width: "100%", borderCollapse: "collapse",
                fontSize: "0.85rem",
              }}>
                <thead>
                  <tr style={{ background: "#F4F8FB" }}>
                    {["#","Name","Phone","Email","Service","Source",
                      "Status","Date","Actions"].map((h) => (
                      <th key={h} style={{
                        padding: "12px 16px", textAlign: "left",
                        fontWeight: 700, fontSize: "0.75rem",
                        color: "#8FA3B4", textTransform: "uppercase",
                        letterSpacing: "0.8px", whiteSpace: "nowrap",
                        borderBottom: "1px solid #e0e9f2",
                      }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {displayData.map((row, idx) => (
                    <tr key={row.id} className="row-hover"
                      style={{ borderBottom: "1px solid #f0f4f8",
                        background: !row.read ? "rgba(47,164,199,0.03)" : "#fff",
                        transition: "background 0.2s" }}
                      onClick={() => setSelected(row)}
                    >
                      <td style={{ padding: "12px 16px", color: "#8FA3B4",
                        fontSize: "0.75rem", fontWeight: 600 }}>
                        {idx + 1}
                        {!row.read && (
                          <span style={{ marginLeft: "6px", width: "6px",
                            height: "6px", borderRadius: "50%",
                            background: "#2FA4C7", display: "inline-block" }} />
                        )}
                      </td>
                      <td style={{ padding: "12px 16px", fontWeight: 600,
                        color: "#1E3A5F", whiteSpace: "nowrap" }}>
                        {row.name || "—"}
                      </td>
                      <td style={{ padding: "12px 16px", color: "#556B7D",
                        whiteSpace: "nowrap" }}>
                        {row.phone
                          ? <a href={`tel:${row.phone}`}
                              onClick={(e) => e.stopPropagation()}
                              style={{ color: "#2FA4C7", textDecoration: "none",
                                fontWeight: 500 }}>{row.phone}</a>
                          : "—"}
                      </td>
                      <td className="dash-col-hide" style={{ padding: "12px 16px",
                        color: "#556B7D", maxWidth: "160px",
                        overflow: "hidden", textOverflow: "ellipsis",
                        whiteSpace: "nowrap" }}>
                        {row.email || "—"}
                      </td>
                      <td className="dash-col-hide" style={{ padding: "12px 16px",
                        color: "#556B7D", whiteSpace: "nowrap" }}>
                        {row.service || "General"}
                      </td>
                      <td style={{ padding: "12px 16px" }}>
                        <span style={{
                          padding: "3px 10px", borderRadius: "50px",
                          background: "#F4F8FB", color: "#556B7D",
                          fontSize: "0.72rem", fontWeight: 600,
                          whiteSpace: "nowrap",
                        }}>
                          {SOURCE_LABELS[row.source] || row.source || "—"}
                        </span>
                      </td>
                      <td style={{ padding: "12px 16px" }}>
                        <StatusBadge status={row.status || "pending"} />
                      </td>
                      <td className="dash-col-hide" style={{ padding: "12px 16px",
                        color: "#8FA3B4", fontSize: "0.78rem",
                        whiteSpace: "nowrap" }}>
                        {formatDate(row.createdAt)}
                      </td>
                      <td style={{ padding: "12px 16px" }}
                        onClick={(e) => e.stopPropagation()}>
                        <div style={{ display: "flex", gap: "6px" }}>
                          {/* Quick status select */}
                          <select
                            value={row.status || "pending"}
                            onChange={(e) => handleStatusChange(row, e.target.value)}
                            style={{
                              padding: "5px 8px", borderRadius: "6px",
                              border: "1px solid #e0e9f2", fontSize: "0.75rem",
                              fontFamily: "inherit", color: "#1E3A5F",
                              background: "#fff", cursor: "pointer", outline: "none",
                            }}
                          >
                            {Object.entries(STATUS_CONFIG).map(([k, v]) => (
                              <option key={k} value={k}>{v.label}</option>
                            ))}
                          </select>
                          {/* Delete */}
                          <button onClick={() => handleDelete(row)}
                            style={{
                              padding: "5px 8px", borderRadius: "6px",
                              background: "#FEF2F2", border: "none",
                              color: "#DC2626", cursor: "pointer",
                              fontSize: "0.75rem", fontFamily: "inherit",
                              fontWeight: 600,
                            }}>🗑</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Footer */}
          <div style={{
            padding: "12px 20px", borderTop: "1px solid #e0e9f2",
            display: "flex", justifyContent: "space-between",
            alignItems: "center", flexWrap: "wrap", gap: "8px",
          }}>
            <span style={{ color: "#8FA3B4", fontSize: "0.78rem" }}>
              Showing {displayData.length} of {allData.length} entries
            </span>
            <span style={{ color: "#8FA3B4", fontSize: "0.78rem" }}>
              Click any row to view full details
            </span>
          </div>
        </div>
      </div>

      {/* ── Detail Modal ──────────────────────────────────────────────────── */}
      <DetailModal
        entry={selected}
        onClose={() => setSelected(null)}
        onStatusChange={handleStatusChange}
        onDelete={handleDelete}
      />

      {/* ── Toast ─────────────────────────────────────────────────────────── */}
      {toast && (
        <div style={{
          position: "fixed", bottom: "24px", left: "50%",
          transform: "translateX(-50%)",
          padding: "12px 24px", borderRadius: "50px",
          background: toast.type === "error" ? "#DC2626" : "#1E3A5F",
          color: "#fff", fontWeight: 600, fontSize: "0.85rem",
          boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
          zIndex: 9999, whiteSpace: "nowrap",
          animation: "toastIn 0.3s ease",
        }}>
          {toast.type === "error" ? "❌" : "✅"} {toast.msg}
        </div>
      )}
    </div>
  );
}