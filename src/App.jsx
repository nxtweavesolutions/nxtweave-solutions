// src/App.jsx

import { Routes, Route, Link } from "react-router-dom";

import Home from "./pages/Home";
import Services from "./pages/Services";
import About from "./pages/About";
import Contact from "./pages/Contact";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";

import ProtectedRoute from "./components/ProtectedRoute";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="flex flex-col min-h-screen">

      {/* 🔝 Navbar */}
      <Navbar />

      {/* 🌐 Main Content */}
      <main className="flex-grow">
        <Routes>

          {/* 🌍 Public Pages */}
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          {/* 🔐 Admin Login */}
          <Route path="/admin" element={<AdminLogin />} />

          {/* 🔐 Protected Admin Dashboard */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* ❌ 404 Page */}
          <Route
            path="*"
            element={
              <div className="min-h-screen flex items-center justify-center bg-gray-100 text-center px-6">
                <div>
                  <h1 className="text-8xl font-bold text-[#1E3A5F] mb-4">
                    404
                  </h1>
                  <p className="text-2xl text-gray-700 mb-8">
                    Page Not Found
                  </p>
                  <Link
                    to="/"
                    className="inline-block bg-[#4CAF50] text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#43A047] transition"
                  >
                    Back to Home
                  </Link>
                </div>
              </div>
            }
          />

        </Routes>
      </main>

      {/* 🔻 Footer */}
      <Footer />

    </div>
  );
}

export default App;