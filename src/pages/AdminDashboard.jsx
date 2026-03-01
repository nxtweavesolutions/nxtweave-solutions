// src/pages/AdminDashboard.jsx
import { useEffect, useState, useMemo } from "react";
import {
  collection,
  onSnapshot,
  deleteDoc,
  doc,
  updateDoc,
  query,
  orderBy,
} from "firebase/firestore";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { db, auth } from "../firebase";

export default function AdminDashboard() {
  const [queries, setQueries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const navigate = useNavigate();

  // 🔥 Real-time Listener from "queries" collection (Latest First)
  useEffect(() => {
    const q = query(
      collection(db, "queries"),           // ← Yeh change kiya: "contacts" → "queries"
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((docItem) => ({
        id: docItem.id,
        status: docItem.data().status || "pending",
        ...docItem.data(),
      }));
      setQueries(data);
    });

    return () => unsubscribe();
  }, []);

  // 🔴 Logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/admin", { replace: true });
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  // 🗑 Delete Record
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this query?")) return;

    try {
      await deleteDoc(doc(db, "queries", id));
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete. Please try again.");
    }
  };

  // ✅ Mark Resolved
  const markResolved = async (id) => {
    try {
      await updateDoc(doc(db, "queries", id), {
        status: "resolved",
      });
    } catch (error) {
      console.error("Update error:", error);
      alert("Failed to update status.");
    }
  };

  // ⏱ Time Ago Helper
  const getTimeAgo = (timestamp) => {
    if (!timestamp || !timestamp.toDate) return "Old Record";

    const now = new Date();
    const created = timestamp.toDate();
    const diff = Math.floor((now - created) / 1000);

    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;

    return created.toLocaleDateString() + " " + created.toLocaleTimeString();
  };

  // 🔎 Filter Logic
  const filteredQueries = useMemo(() => {
    return queries.filter((query) => {
      const matchesSearch =
        query.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        query.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        query.message?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        query.source?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesFilter =
        filterStatus === "all" || query.status === filterStatus;

      return matchesSearch && matchesFilter;
    });
  }, [queries, searchTerm, filterStatus]);

  // 📊 Stats
  const total = queries.length;
  const resolved = queries.filter((q) => q.status === "resolved").length;
  const pending = total - resolved;

  return (
    <div className="min-h-screen bg-gray-100 pt-32 px-6 pb-12">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-[#1E3A5F]">
          Admin Dashboard
        </h1>
        <p className="text-gray-500 mt-2 text-sm">
          Manage and track all consultation requests (Home + Contact).
        </p>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white shadow-md rounded-xl p-6">
          <p className="text-gray-500 text-sm">Total Queries</p>
          <h2 className="text-3xl font-bold">{total}</h2>
        </div>

        <div className="bg-yellow-50 shadow-md rounded-xl p-6">
          <p className="text-yellow-600 text-sm">Pending</p>
          <h2 className="text-3xl font-bold text-yellow-700">{pending}</h2>
        </div>

        <div className="bg-green-50 shadow-md rounded-xl p-6">
          <p className="text-green-600 text-sm">Resolved</p>
          <h2 className="text-3xl font-bold text-green-700">{resolved}</h2>
        </div>
      </div>

      {/* Search + Logout + Filter */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <input
          type="text"
          placeholder="Search by name, email, message, source..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/3 px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2FA4C7]"
        />

        <div className="flex items-center gap-3 flex-wrap">
          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-xl text-sm font-semibold transition"
          >
            Logout
          </button>

          {["all", "pending", "resolved"].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition ${
                filterStatus === status
                  ? status === "resolved"
                    ? "bg-green-500 text-white"
                    : status === "pending"
                    ? "bg-yellow-500 text-white"
                    : "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white shadow-md rounded-xl overflow-x-auto">
        <table className="min-w-full text-sm text-left text-gray-600">
          <thead className="bg-gray-200 text-gray-700 uppercase text-xs">
            <tr>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Phone</th>
              <th className="px-6 py-4">Message</th>
              <th className="px-6 py-4">Source</th>
              <th className="px-6 py-4">Submitted</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredQueries.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center py-12 text-gray-500">
                  No matching queries found. Submit a form to test.
                </td>
              </tr>
            ) : (
              filteredQueries.map((query) => (
                <tr key={query.id} className="border-b hover:bg-gray-50 transition">
                  <td className="px-6 py-4 font-medium">{query.name || "—"}</td>
                  <td className="px-6 py-4">{query.email || "—"}</td>
                  <td className="px-6 py-4">{query.phone || "—"}</td>
                  <td className="px-6 py-4 max-w-xs truncate">
                    {query.message || "No message"}
                  </td>
                  <td className="px-6 py-4 capitalize">
                    {query.source || "Unknown"}
                  </td>
                  <td className="px-6 py-4 text-xs text-gray-500">
                    {getTimeAgo(query.createdAt)}
                  </td>
                  <td className="px-6 py-4">
                    {query.status === "resolved" ? (
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                        ✔ Resolved
                      </span>
                    ) : (
                      <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-semibold">
                        ⏳ Pending
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-center space-x-2">
                    {query.status !== "resolved" && (
                      <button
                        onClick={() => markResolved(query.id)}
                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md text-xs transition"
                      >
                        Resolve
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(query.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-xs transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}