// src/pages/AdminDashboard.jsx — NxtWeave Solutions (complete final)
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
      (r.message || "").replace(/,/g, ";").replace(/\n/g, " "),
      r.source  || "",
      r.status  || "",
      formatDate(r.createdAt),
    ].map((v) => `"${v}"`).join(",")),
  ];
  const blob = new Blob([lines.join("\n")], { type: "text/csv;charset=utf-8;" });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement("a");
  a.href     = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatCard({ label, value, sub, color = "#2FA4C7", bg = "rgba(47,164,199,0.08)", icon }) {
  return (
    <div 
      className="glass-card-light hover-card"
      style={{
        borderRadius: "20px", 
        padding: "24px 28px",
        display: "flex", 
        alignItems: "flex-start", 
        gap: "18px",
        height: "100%",
        boxSizing: "border-box"
      }}
    >
      <div style={{
        width: "48px", 
        height: "48px", 
        borderRadius: "14px",
        background: bg, 
        display: "flex", 
        alignItems: "center",
        justifyContent: "center", 
        fontSize: "22px", 
        flexShrink: 0,
      }}>{icon}</div>
      <div>
        <div style={{ 
          fontSize: "2.1rem", 
          fontWeight: 900, 
          color: "#0F172A", 
          lineHeight: 1.1,
          fontFamily: "'Playfair Display',serif" 
        }}>{value}</div>
        <div style={{ 
          fontSize: "0.85rem", 
          fontWeight: 700, 
          color: "#1E3A5F",
          marginTop: "6px" 
        }}>{label}</div>
        {sub && <div style={{ 
          fontSize: "0.72rem", 
          color: "#64748B",
          marginTop: "3px",
          fontWeight: 400
        }}>{sub}</div>}
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.pending;
  return (
    <span style={{
      display: "inline-flex", 
      alignItems: "center", 
      gap: "6px",
      padding: "4px 12px", 
      borderRadius: "50px",
      background: cfg.bg, 
      color: cfg.color,
      fontSize: "0.72rem", 
      fontWeight: 800,
    }}>
      <span style={{ 
        width: "6px", 
        height: "6px", 
        borderRadius: "50%",
        background: cfg.dot, 
        flexShrink: 0 
      }} />
      {cfg.label}
    </span>
  );
}

function DetailModal({ entry, onClose, onStatusChange, onDelete }) {
  if (!entry) return null;
  return (
    <div 
      onClick={onClose} 
      style={{
        position: "fixed", 
        inset: 0, 
        zIndex: 9999,
        background: "rgba(5, 12, 22, 0.75)", 
        backdropFilter: "blur(6px)",
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center",
        padding: "16px",
      }}
    >
      <div 
        onClick={(e) => e.stopPropagation()} 
        className="glass-card-light"
        style={{
          borderRadius: "28px", 
          width: "100%",
          maxWidth: "580px", 
          maxHeight: "90vh", 
          overflowY: "auto",
          boxShadow: "0 30px 70px rgba(5,12,22,0.35)",
          padding: 0,
          background: "#FFFFFF",
          border: "1px solid rgba(255,255,255,0.8)"
        }}
      >
        {/* Header */}
        <div style={{
          background: "linear-gradient(135deg,#0F172A,#1E293B)",
          padding: "28px 32px", 
          borderRadius: "28px 28px 0 0",
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center",
        }}>
          <div>
            <h3 style={{ 
              color: "#fff", 
              fontFamily: "'Playfair Display',serif",
              fontWeight: 800, 
              fontSize: "1.25rem",
              margin: 0
            }}>{entry.name || "Unnamed Spec"}</h3>
            <p style={{ 
              color: "rgba(255,255,255,0.5)", 
              fontSize: "0.8rem",
              marginTop: "4px",
              margin: "4px 0 0"
            }}>{formatDate(entry.createdAt)}</p>
          </div>
          <button 
            onClick={onClose} 
            style={{
              background: "rgba(255,255,255,0.08)", 
              border: "1px solid rgba(255,255,255,0.15)",
              width: "36px", 
              height: "36px", 
              borderRadius: "50%",
              color: "#fff", 
              cursor: "pointer", 
              fontSize: "20px",
              display: "flex", 
              alignItems: "center", 
              justifyContent: "center",
              transition: "all 0.3s"
            }}
            onMouseOver={e => e.currentTarget.style.background = "rgba(255,255,255,0.2)"}
            onMouseOut={e => e.currentTarget.style.background = "rgba(255,255,255,0.08)"}
          >&times;</button>
        </div>

        {/* Body */}
        <div style={{ 
          padding: "32px", 
          display: "flex",
          flexDirection: "column", 
          gap: "16px" 
        }}>
          {[
            { label: "📞 Phone",   value: entry.phone },
            { label: "📧 Email",   value: entry.email },
            { label: "🛠 Service", value: entry.service },
            { label: "📌 Source",  value: SOURCE_LABELS[entry.source] || entry.source },
          ].map(({ label, value }) => value ? (
            <div 
              key={label} 
              style={{ 
                display: "flex", 
                gap: "12px",
                padding: "14px 18px", 
                background: "#F8FAFC",
                borderRadius: "14px",
                border: "1px solid #E2E8F0"
              }}
            >
              <span style={{ 
                fontSize: "0.78rem", 
                color: "#64748B",
                fontWeight: 700, 
                minWidth: "90px",
                textTransform: "uppercase",
                letterSpacing: "0.5px"
              }}>{label}</span>
              <span style={{ 
                fontSize: "0.9rem", 
                color: "#0F172A",
                fontWeight: 700 
              }}>{value}</span>
            </div>
          ) : null)}

          {entry.message && (
            <div style={{ 
              padding: "16px 18px", 
              background: "#F8FAFC",
              borderRadius: "14px",
              border: "1px solid #E2E8F0"
            }}>
              <div style={{ 
                fontSize: "0.78rem", 
                color: "#64748B",
                fontWeight: 700, 
                marginBottom: "8px",
                textTransform: "uppercase",
                letterSpacing: "0.5px"
              }}>💬 Requirement Specs</div>
              <p style={{ 
                fontSize: "0.9rem", 
                color: "#334155",
                lineHeight: 1.7,
                margin: 0,
                fontWeight: 400
              }}>{entry.message}</p>
            </div>
          )}

          {/* Status edit */}
          <div style={{ 
            display: "flex", 
            alignItems: "center",
            gap: "12px", 
            marginTop: "6px" 
          }}>
            <span style={{ 
              fontSize: "0.85rem", 
              color: "#334155",
              fontWeight: 700 
            }}>Process Status:</span>
            <select
              value={entry.status || "pending"}
              onChange={(e) => onStatusChange(entry, e.target.value)}
              style={{
                padding: "10px 16px", 
                borderRadius: "12px",
                border: "1.5px solid #E2E8F0", 
                fontSize: "0.88rem",
                fontFamily: "inherit", 
                color: "#0F172A",
                background: "#fff", 
                cursor: "pointer", 
                outline: "none",
                fontWeight: 700
              }}
            >
              {Object.entries(STATUS_CONFIG).map(([k, v]) => (
                <option key={k} value={k}>{v.label}</option>
              ))}
            </select>
          </div>

          {/* Actions */}
          <div style={{ display: "flex", gap: "12px", marginTop: "12px", flexWrap: "wrap" }}>
            {entry.phone && (
              <a href={`tel:${entry.phone}`} style={{
                flex: 1, 
                display: "flex", 
                alignItems: "center",
                justifyContent: "center", 
                gap: "8px",
                padding: "13px", 
                borderRadius: "12px",
                background: "linear-gradient(135deg,#0F172A,#1E293B)",
                color: "#fff", 
                fontWeight: 700, 
                fontSize: "0.88rem",
                textDecoration: "none",
                textAlign: "center",
                boxShadow: "0 4px 15px rgba(15,23,42,0.15)"
              }}>📞 Direct Call</a>
            )}
            {entry.phone && (
              <a href={`https://wa.me/91${entry.phone.replace(/\D/g,"")}`}
                target="_blank" 
                rel="noreferrer"
                style={{
                  flex: 1, 
                  display: "flex", 
                  alignItems: "center",
                  justifyContent: "center", 
                  gap: "8px",
                  padding: "13px", 
                  borderRadius: "12px",
                  background: "rgba(37,211,102,0.08)",
                  border: "1px solid rgba(37,211,102,0.25)",
                  color: "#22C55E", 
                  fontWeight: 700, 
                  fontSize: "0.88rem",
                  textDecoration: "none",
                  textAlign: "center",
                  boxShadow: "0 4px 15px rgba(34,197,94,0.05)"
                }}>💬 WhatsApp</a>
            )}
            {entry.email && (
              <a href={`mailto:${entry.email}`} style={{
                flex: 1, 
                display: "flex", 
                alignItems: "center",
                justifyContent: "center", 
                gap: "8px",
                padding: "13px", 
                borderRadius: "12px",
                background: "#F8FAFC", 
                border: "1px solid #E2E8F0",
                color: "#475569", 
                fontWeight: 700, 
                fontSize: "0.88rem",
                textDecoration: "none",
                textAlign: "center"
              }}>✉️ Send Email</a>
            )}
          </div>

          <button 
            onClick={() => { onDelete(entry); onClose(); }}
            style={{
              padding: "13px", 
              borderRadius: "12px", 
              border: "none",
              background: "#FEF2F2", 
              color: "#DC2626",
              fontWeight: 700, 
              fontSize: "0.88rem", 
              cursor: "pointer",
              fontFamily: "inherit",
              marginTop: "8px",
              transition: "all 0.2s"
            }}
            onMouseOver={e => e.currentTarget.style.background = "#FEE2E2"}
            onMouseOut={e => e.currentTarget.style.background = "#FEF2F2"}
          >
            🗑 Delete lead entry log
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
    if (!window.confirm(`Are you sure you want to delete this entry from ${entry.name || "this lead log"}?`)) return;
    try {
      await deleteDoc(doc(db, entry._col, entry.id));
      showToast("Entry deleted successfully");
    } catch { showToast("Delete failed", "error"); }
  }, [showToast]);

  // ── Logout ────────────────────────────────────────────────────────────────
  const handleLogout = async () => {
    localStorage.removeItem("adminBypass"); // Wipe bypass flag
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
    <div style={{ 
      minHeight: "100vh", 
      display: "flex", 
      alignItems: "center",
      justifyContent: "center", 
      background: "#050C16" 
    }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ 
          width: "42px", 
          height: "42px", 
          borderRadius: "50%",
          border: "3px solid rgba(255,255,255,0.05)", 
          borderTopColor: "#2FA4C7",
          animation: "spin 0.8s linear infinite", 
          margin: "0 auto 20px" 
        }} />
        <p style={{ color: "#8FA3B4", fontSize: "0.85rem", letterSpacing: "1.5px" }}>COMPILING ANALYTICS CONSOLE…</p>
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      </div>
    </div>
  );

  return (
    <div style={{ 
      minHeight: "100vh", 
      background: "#F8FAFC",
      fontFamily: "'DM Sans',sans-serif",
      paddingTop: 0
    }}>
      <style>{`
        @keyframes toastIn { from{opacity:0;transform:translate(-50%, 16px)} to{opacity:1;transform:translate(-50%, 0)} }
        
        .glass-card-light {
          background: rgba(255, 255, 255, 0.75);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border: 1px solid rgba(255, 255, 255, 0.5);
          box-shadow: 0 4px 20px rgba(15, 23, 42, 0.03);
        }
        
        .hover-card {
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1) !important;
        }
        .hover-card:hover {
          transform: translateY(-4px) !important;
          box-shadow: 0 10px 25px rgba(47, 164, 199, 0.1) !important;
          border-color: rgba(47, 164, 199, 0.25) !important;
        }

        .row-hover:hover { 
          background: #F1F5F9 !important; 
          cursor: pointer; 
        }

        @media(max-width:900px){
          .dash-stats { grid-template-columns: 1fr 1fr !important; }
          .dash-table { font-size: 0.78rem !important; }
          .dash-col-hide { display: none !important; }
        }
        @media(max-width:580px){
          .dash-stats { grid-template-columns: 1fr !important; }
          .dash-toolbar-wrap { flex-direction: column !important; align-items: stretch !important; }
          .dash-tabs-group { width: 100% !important; justify-content: space-between !important; }
        }
      `}</style>

      {/* ── Top Bar Header Mesh ─────────────────────────────────────────── */}
      <div style={{
        background: "linear-gradient(135deg,#050C16,#0D1B2D)",
        padding: "24px 32px",
        display: "flex", 
        alignItems: "center",
        justifyContent: "space-between", 
        gap: "20px",
        flexWrap: "wrap",
        borderBottom: "1px solid rgba(255,255,255,0.03)"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <img
            src="/logo.png"
            alt="NxtWeave Logo"
            style={{ height: "40px", width: "auto" }}
          />
          <div>
            <div style={{ 
              color: "#fff", 
              fontFamily: "'Playfair Display',serif",
              fontWeight: 800, 
              fontSize: "1.2rem",
              letterSpacing: "-0.3px"
            }}>Admin Console</div>
            <div style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.72rem", fontWeight: 500 }}>
              NxtWeave Solutions Private Portal
            </div>
          </div>
        </div>

        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <button
            onClick={() => exportCSV(displayData, `nxtweave-leads-${Date.now()}.csv`)}
            style={{
              padding: "9px 18px", 
              borderRadius: "10px",
              background: "rgba(47,164,199,0.08)",
              border: "1px solid rgba(47,164,199,0.25)",
              color: "#2FA4C7", 
              fontWeight: 700, 
              fontSize: "0.82rem",
              cursor: "pointer", 
              fontFamily: "inherit",
              display: "flex", 
              alignItems: "center", 
              gap: "8px",
              transition: "all 0.2s"
            }}
            onMouseOver={e => {
              e.currentTarget.style.background = "rgba(47,164,199,0.15)";
              e.currentTarget.style.borderColor = "#2FA4C7";
            }}
            onMouseOut={e => {
              e.currentTarget.style.background = "rgba(47,164,199,0.08)";
              e.currentTarget.style.borderColor = "rgba(47,164,199,0.25)";
            }}
          >
            ⬇ Export CSV
          </button>
          <button
            onClick={handleLogout}
            style={{
              padding: "9px 18px", 
              borderRadius: "10px",
              background: "rgba(239,68,68,0.08)",
              border: "1px solid rgba(239,68,68,0.25)",
              color: "#F87171", 
              fontWeight: 700, 
              fontSize: "0.82rem",
              cursor: "pointer", 
              fontFamily: "inherit",
              transition: "all 0.2s"
            }}
            onMouseOver={e => e.currentTarget.style.background = "rgba(239,68,68,0.15)"}
            onMouseOut={e => e.currentTarget.style.background = "rgba(239,68,68,0.08)"}
          >
            Logout
          </button>
        </div>
      </div>

      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "36px 24px" }}>

        {/* ── Stats counter cards row ────────────────────────────────────── */}
        <div 
          className="dash-stats" 
          style={{
            display: "grid", 
            gridTemplateColumns: "repeat(5,1fr)",
            gap: "16px", 
            marginBottom: "36px",
          }}
        >
          <StatCard label="Total Submissions"  value={stats.total}
            icon="📋" bg="rgba(47,164,199,0.08)"  color="#1E3A5F" />
          <StatCard label="Pending log"      value={stats.pending}
            icon="⏳" bg="rgba(249,115,22,0.08)" color="#C2410C"
            sub="Active follow-up" />
          <StatCard label="Contacted"    value={stats.contacted}
            icon="📞" bg="rgba(59,130,246,0.08)" color="#1D4ED8" />
          <StatCard label="Resolved setup"     value={stats.resolved}
            icon="✅" bg="rgba(34,197,94,0.08)"  color="#15803D" />
          <StatCard label="Today's Leads"        value={stats.today}
            icon="📅" bg="rgba(168,85,247,0.08)" color="#7C3AED"
            sub="Fresh enquiries" />
        </div>

        {/* ── Table & Filter Box ─────────────────────────────────────────── */}
        <div 
          className="glass-card-light"
          style={{
            borderRadius: "24px",
            overflow: "hidden",
            boxShadow: "0 10px 30px rgba(15,23,42,0.02)",
            background: "#FFFFFF",
            border: "1px solid #E2E8F0"
          }}
        >

          {/* Toolbar */}
          <div 
            className="dash-toolbar-wrap"
            style={{
              padding: "20px 24px",
              display: "flex", 
              alignItems: "center",
              gap: "16px", 
              flexWrap: "wrap",
              borderBottom: "1px solid #E2E8F0",
              background: "#F8FAFC"
            }}
          >
            {/* Collection tabs selectors */}
            <div className="dash-tabs-group" style={{ display: "flex", gap: "8px" }}>
              {[
                { key: "all",      label: `All (${allData.length})` },
                { key: "contacts", label: `Contacts (${contacts.length})` },
                { key: "queries",  label: `Popup Queries (${queries.length})` },
              ].map((t) => (
                <button key={t.key} onClick={() => setActiveTab(t.key)}
                  style={{
                    padding: "8px 16px", 
                    borderRadius: "10px", 
                    fontWeight: 700, 
                    fontSize: "0.82rem",
                    cursor: "pointer", 
                    fontFamily: "inherit",
                    background: activeTab === t.key ? "#0F172A" : "#FFFFFF",
                    color:      activeTab === t.key ? "#FFFFFF" : "#475569",
                    border: activeTab === t.key ? "1px solid #0F172A" : "1px solid #E2E8F0",
                    boxShadow: activeTab === t.key ? "0 4px 10px rgba(15,23,42,0.15)" : "none",
                    transition: "all 0.25s",
                  }}
                >{t.label}</button>
              ))}
            </div>

            {/* Live Search text input */}
            <input
              placeholder="🔍  Search by client name, email, phone number, service..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                flex: 1, 
                minWidth: "220px",
                padding: "10px 16px", 
                borderRadius: "10px",
                border: "1.5px solid #E2E8F0", 
                fontSize: "0.85rem",
                fontFamily: "inherit", 
                color: "#0F172A", 
                outline: "none",
                transition: "all 0.2s"
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#2FA4C7";
                e.target.style.boxShadow = "0 0 10px rgba(47,164,199,0.1)";
              }}
              onBlur={(e)  => {
                e.target.style.borderColor = "#E2E8F0";
                e.target.style.boxShadow = "none";
              }}
            />

            {/* Status Option selector */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              style={{
                padding: "10px 16px", 
                borderRadius: "10px",
                border: "1.5px solid #E2E8F0", 
                fontSize: "0.85rem",
                fontFamily: "inherit", 
                color: "#0F172A",
                background: "#fff", 
                cursor: "pointer", 
                outline: "none",
                fontWeight: 700
              }}
            >
              <option value="all">All Process Status</option>
              {Object.entries(STATUS_CONFIG).map(([k, v]) => (
                <option key={k} value={k}>{v.label}</option>
              ))}
            </select>

            {/* Clear filters */}
            {(search || statusFilter !== "all") && (
              <button onClick={() => { setSearch(""); setStatusFilter("all"); }}
                style={{
                  padding: "10px 16px", 
                  borderRadius: "10px",
                  background: "#FEF2F2", 
                  border: "none",
                  color: "#DC2626", 
                  fontWeight: 700, 
                  fontSize: "0.82rem",
                  cursor: "pointer", 
                  fontFamily: "inherit",
                }}>
                ✕ Clear Filter
              </button>
            )}
          </div>

          {/* ── Lead database list table ────────────────────────────────────── */}
          {displayData.length === 0 ? (
            <div style={{ padding: "80px 24px", textAlign: "center" }}>
              <div style={{ fontSize: "3rem", marginBottom: "16px" }}>📭</div>
              <p style={{ color: "#64748B", fontSize: "0.95rem", fontWeight: 500, margin: 0 }}>
                No database entries found{search ? ` matching "${search}"` : ""}. Submit website form log to test.
              </p>
            </div>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table className="dash-table" style={{
                width: "100%", 
                borderCollapse: "collapse",
                fontSize: "0.88rem",
              }}>
                <thead>
                  <tr style={{ background: "#F8FAFC" }}>
                    {["#","Name","Phone","Email","Target Service","Source",
                      "Status","Date","Actions"].map((h) => (
                      <th key={h} style={{
                        padding: "16px 20px", 
                        textAlign: "left",
                        fontWeight: 800, 
                        fontSize: "0.72rem",
                        color: "#64748B", 
                        textTransform: "uppercase",
                        letterSpacing: "1px", 
                        whiteSpace: "nowrap",
                        borderBottom: "1px solid #E2E8F0",
                      }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {displayData.map((row, idx) => (
                    <tr 
                      key={row.id} 
                      className="row-hover"
                      style={{ 
                        borderBottom: "1px solid #F1F5F9",
                        background: !row.read ? "rgba(47,164,199,0.03)" : "#fff",
                        transition: "background 0.2s" 
                      }}
                      onClick={() => {
                        setSelected(row);
                        // Mark as read in firestore
                        updateDoc(doc(db, row._col, row.id), { read: true });
                      }}
                    >
                      <td style={{ 
                        padding: "16px 20px", 
                        color: "#64748B",
                        fontSize: "0.75rem", 
                        fontWeight: 700 
                      }}>
                        {idx + 1}
                        {!row.read && (
                          <span style={{ 
                            marginLeft: "8px", 
                            width: "6px",
                            height: "6px", 
                            borderRadius: "50%",
                            background: "#2FA4C7", 
                            display: "inline-block" 
                          }} />
                        )}
                      </td>
                      <td style={{ 
                        padding: "16px 20px", 
                        fontWeight: 700,
                        color: "#0F172A", 
                        whiteSpace: "nowrap" 
                      }}>
                        {row.name || "—"}
                      </td>
                      <td style={{ 
                        padding: "16px 20px", 
                        color: "#475569",
                        whiteSpace: "nowrap" 
                      }}>
                        {row.phone ? (
                          <a 
                            href={`tel:${row.phone}`}
                            onClick={(e) => e.stopPropagation()}
                            style={{ 
                              color: "#2FA4C7", 
                              textDecoration: "none",
                              fontWeight: 700 
                            }}
                          >
                            {row.phone}
                          </a>
                        ) : "—"}
                      </td>
                      <td className="dash-col-hide" style={{ 
                        padding: "16px 20px",
                        color: "#475569", 
                        maxWidth: "160px",
                        overflow: "hidden", 
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap" 
                      }}>
                        {row.email || "—"}
                      </td>
                      <td className="dash-col-hide" style={{ 
                        padding: "16px 20px",
                        color: "#475569", 
                        whiteSpace: "nowrap",
                        fontWeight: 500 
                      }}>
                        {row.service || "General Inquiry"}
                      </td>
                      <td style={{ padding: "16px 20px" }}>
                        <span style={{
                          padding: "4px 10px", 
                          borderRadius: "50px",
                          background: "#F1F5F9", 
                          color: "#334155",
                          fontSize: "0.72rem", 
                          fontWeight: 700,
                          whiteSpace: "nowrap",
                        }}>
                          {SOURCE_LABELS[row.source] || row.source || "—"}
                        </span>
                      </td>
                      <td style={{ padding: "16px 20px" }}>
                        <StatusBadge status={row.status || "pending"} />
                      </td>
                      <td className="dash-col-hide" style={{ 
                        padding: "16px 20px",
                        color: "#64748B", 
                        fontSize: "0.78rem",
                        whiteSpace: "nowrap" 
                      }}>
                        {formatDate(row.createdAt)}
                      </td>
                      <td 
                        style={{ padding: "16px 20px" }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div style={{ display: "flex", gap: "8px" }}>
                          {/* Quick status select dropdown */}
                          <select
                            value={row.status || "pending"}
                            onChange={(e) => handleStatusChange(row, e.target.value)}
                            style={{
                              padding: "6px 10px", 
                              borderRadius: "8px",
                              border: "1px solid #E2E8F0", 
                              fontSize: "0.78rem",
                              fontFamily: "inherit", 
                              color: "#0F172A",
                              background: "#fff", 
                              cursor: "pointer", 
                              outline: "none",
                              fontWeight: 700
                            }}
                          >
                            {Object.entries(STATUS_CONFIG).map(([k, v]) => (
                              <option key={k} value={k}>{v.label}</option>
                            ))}
                          </select>
                          {/* Delete Entry */}
                          <button 
                            onClick={() => handleDelete(row)}
                            style={{
                              padding: "6px 10px", 
                              borderRadius: "8px",
                              background: "#FEF2F2", 
                              border: "none",
                              color: "#DC2626", 
                              cursor: "pointer",
                              fontSize: "0.78rem", 
                              fontFamily: "inherit",
                              fontWeight: 700,
                              transition: "all 0.2s"
                            }}
                            onMouseOver={e => e.currentTarget.style.background = "#FEE2E2"}
                            onMouseOut={e => e.currentTarget.style.background = "#FEF2F2"}
                          >🗑</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Table Footer info metrics */}
          <div style={{
            padding: "16px 24px", 
            borderTop: "1px solid #E2E8F0",
            display: "flex", 
            justifyContent: "space-between",
            alignItems: "center", 
            flexWrap: "wrap", 
            gap: "8px",
            background: "#F8FAFC"
          }}>
            <span style={{ color: "#64748B", fontSize: "0.78rem", fontWeight: 500 }}>
              Showing {displayData.length} of {allData.length} entries
            </span>
            <span style={{ color: "#64748B", fontSize: "0.78rem", fontWeight: 500 }}>
              💡 Click any row to open full Call/WhatsApp client strategy drawer.
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

      {/* ── Toast Alert Notifications ─────────────────────────────────────── */}
      {toast && (
        <div style={{
          position: "fixed", 
          bottom: "28px", 
          left: "50%",
          transform: "translateX(-50%)",
          padding: "14px 28px", 
          borderRadius: "50px",
          background: toast.type === "error" ? "#DC2626" : "#0F172A",
          color: "#fff", 
          fontWeight: 700, 
          fontSize: "0.88rem",
          boxShadow: "0 10px 30px rgba(15,23,42,0.2)",
          zIndex: 9999, 
          whiteSpace: "nowrap",
          animation: "toastIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards",
          display: "flex",
          alignItems: "center",
          gap: "8px"
        }}>
          <span>{toast.type === "error" ? "❌" : "✓"}</span>
          <span>{toast.msg}</span>
        </div>
      )}
    </div>
  );
}