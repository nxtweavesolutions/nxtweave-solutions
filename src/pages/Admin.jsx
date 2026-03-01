// src/pages/Admin.jsx
import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "../firebase";

function Admin() {
  const [allQueries, setAllQueries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAllQueries = async () => {
    try {
      const queries = [];

      // 1. Hero queries
      const heroQuery = query(collection(db, "hero_requests"), orderBy("createdAt", "desc"));
      const heroSnapshot = await getDocs(heroQuery);
      heroSnapshot.forEach(doc => {
        queries.push({ id: doc.id, source: "hero", ...doc.data() });
      });

      // 2. Contact/Modal queries
      const contactQuery = query(collection(db, "consultation_requests"), orderBy("createdAt", "desc"));
      const contactSnapshot = await getDocs(contactQuery);
      contactSnapshot.forEach(doc => {
        queries.push({ id: doc.id, source: "contact", ...doc.data() });
      });

      // Sort by date (newest first)
      queries.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      setAllQueries(queries);
      setLoading(false);
    } catch (err) {
      console.error("Admin fetch error:", err);
      setError("Failed to load queries. Check console.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllQueries();
  }, []);

  // Update Status
  const updateStatus = async (id, collectionName, newStatus) => {
    try {
      await updateDoc(doc(db, collectionName, id), {
        status: newStatus,
      });
      fetchAllQueries();
    } catch (err) {
      console.error("Status update failed:", err);
    }
  };

  // Delete Query
  const deleteQuery = async (id, collectionName) => {
    if (!window.confirm("Delete this query?")) return;
    try {
      await deleteDoc(doc(db, collectionName, id));
      fetchAllQueries();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (error) return <div className="text-center py-20 text-red-600">{error}</div>;

  return (
    <div className="min-h-screen bg-[#F4F8FB] p-6 md:p-10">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-[#1E3A5F] mb-8 text-center">
          Admin Dashboard – All Queries
        </h1>

        {allQueries.length === 0 ? (
          <p className="text-center text-gray-600 text-lg">No queries yet.</p>
        ) : (
          <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-[#1E3A5F] text-white">
                <tr>
                  <th className="px-4 py-4">Name</th>
                  <th className="px-4 py-4">Phone</th>
                  <th className="px-4 py-4">Email</th>
                  <th className="px-4 py-4">Service</th>
                  <th className="px-4 py-4">Message</th>
                  <th className="px-4 py-4">Source</th>
                  <th className="px-4 py-4">Date</th>
                  <th className="px-4 py-4">Status</th>
                  <th className="px-4 py-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {allQueries.map((q) => (
                  <tr key={q.id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-4">{q.name || "—"}</td>
                    <td className="px-4 py-4">{q.phone || "—"}</td>
                    <td className="px-4 py-4">{q.email || "—"}</td>
                    <td className="px-4 py-4">{q.service || "General"}</td>
                    <td className="px-4 py-4 max-w-xs truncate">{q.message || "No message"}</td>
                    <td className="px-4 py-4 capitalize">{q.source || "Unknown"}</td>
                    <td className="px-4 py-4">
                      {q.createdAt ? new Date(q.createdAt).toLocaleString() : "—"}
                    </td>
                    <td className="px-4 py-4">
                      <select
                        value={q.status || "new"}
                        onChange={(e) => updateStatus(q.id, q.source === "hero" ? "hero_requests" : "consultation_requests", e.target.value)}
                        className="border rounded px-2 py-1 text-sm"
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="closed">Closed</option>
                      </select>
                    </td>
                    <td className="px-4 py-4">
                      <button
                        onClick={() => deleteQuery(q.id, q.source === "hero" ? "hero_requests" : "consultation_requests")}
                        className="text-red-600 hover:text-red-800"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Admin;