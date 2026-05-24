// src/pages/AdminLogin.jsx

import { useState } from "react";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const ADMIN_EMAIL = "info@nxtweavesolutions.com"; // 🔐 Your admin email

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      // 🔐 Email restriction
      if (userCredential.user.email !== ADMIN_EMAIL) {
        alert("Access Denied! You are not authorized.");
        await signOut(auth);
        setLoading(false);
        return;
      }

      navigate("/dashboard");
    } catch (error) {
      alert("Login Failed: " + error.message);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 pt-28 px-6">
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-[#1E3A5F] mb-8">
          Admin Login
        </h2>

        <form onSubmit={handleLogin} className="space-y-5">
          <input
            type="email"
            required
            placeholder="Admin Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2FA4C7]"
          />

          <input
            type="password"
            required
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2FA4C7]"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#4CAF50] hover:bg-[#43A047] text-white py-4 rounded-xl font-bold text-lg transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
} 