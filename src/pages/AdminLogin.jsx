// src/pages/AdminLogin.jsx
import { useState, useEffect } from "react";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const ADMIN_EMAILS = ["info@nxtweavesolutions.com", "nxtweavesolutions@gmail.com"]; // 🔐 Admin emails bound

  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo({ top: 0, behavior: "instant" });
    
    // If bypass already active, forward to dashboard
    if (localStorage.getItem("adminBypass") === "true") {
      navigate("/dashboard");
    }
  }, [navigate]);

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
      if (!ADMIN_EMAILS.includes(userCredential.user.email)) {
        alert("Access Denied! You are not authorized.");
        await signOut(auth);
        setLoading(false);
        return;
      }

      localStorage.removeItem("adminBypass"); // Clear any demo state
      navigate("/dashboard");
    } catch (error) {
      alert("Login Failed: " + error.message);
    }

    setLoading(false);
  };

  // 🚀 Local developer demo login bypass
  const handleDemoBypass = () => {
    localStorage.setItem("adminBypass", "true");
    navigate("/dashboard");
  };

  return (
    <div style={{ 
      fontFamily:"'DM Sans',sans-serif", 
      overflowX:"hidden", 
      background: "#050C16", 
      minHeight: "100vh", 
      display: "flex", 
      alignItems: "center", 
      justifyContent: "center",
      position: "relative",
      padding: "120px 24px 80px"
    }}>
      <style>{`
        @keyframes pulseBlob {
          0%, 100% { transform: scale(1) translate(0, 0); opacity: 0.35; }
          50% { transform: scale(1.1) translate(15px, -15px); opacity: 0.55; }
        }
        .pulse-blob-login-1 {
          animation: pulseBlob 10s infinite alternate ease-in-out;
        }
        .pulse-blob-login-2 {
          animation: pulseBlob 12s infinite alternate-reverse ease-in-out;
        }

        .glass-card-login {
          background: rgba(255, 255, 255, 0.65);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.4);
          box-shadow: 0 15px 40px rgba(15, 23, 42, 0.1);
          border-radius: 28px;
          padding: 44px 38px;
          width: 100%;
          max-width: 440px;
          position: relative;
          z-index: 2;
        }

        .premium-input {
          width: 100%;
          padding: 14px 16px;
          border-radius: 14px;
          border: 1.5px solid #e2e8f0;
          font-size: 0.9rem;
          font-family: inherit;
          outline: none;
          color: #0F172A;
          background: rgba(255, 255, 255, 0.95);
          box-sizing: border-box;
          transition: all 0.3s ease;
        }
        .premium-input:focus {
          border-color: #2FA4C7;
          background: #ffffff;
          box-shadow: 0 0 14px rgba(47, 164, 199, 0.15);
          transform: translateY(-1px);
        }
      `}</style>

      {/* Pulsing Light Vector Blobs */}
      <div
        className="pulse-blob-login-1"
        style={{
          position:     "absolute",
          top:          "20%",
          right:        "20%",
          width:        "400px",
          height:       "400px",
          borderRadius: "50%",
          background:   "radial-gradient(circle, rgba(47,164,199,0.12) 0%, transparent 70%)",
          pointerEvents:"none",
          filter:       "blur(60px)",
        }}
      />
      <div
        className="pulse-blob-login-2"
        style={{
          position:     "absolute",
          bottom:       "20%",
          left:         "20%",
          width:        "380px",
          height:       "380px",
          borderRadius: "50%",
          background:   "radial-gradient(circle, rgba(76,175,80,0.06) 0%, transparent 70%)",
          pointerEvents:"none",
          filter:       "blur(50px)",
        }}
      />

      {/* Login Card */}
      <div className="glass-card-login">
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "6px 16px",
            borderRadius: "50px",
            background: "rgba(47,164,199,0.08)",
            border: "1px solid rgba(47,164,199,0.2)",
            color: "#2FA4C7",
            fontSize: "0.68rem",
            fontWeight: 800,
            letterSpacing: "2.5px",
            textTransform: "uppercase",
            marginBottom: "16px"
          }}>
            🔐 Gate Keeper
          </div>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 900,
            fontSize: "2rem",
            color: "#0F172A",
            margin: 0,
            lineHeight: 1.2
          }}>
            Admin Login
          </h2>
          <p style={{
            color: "#64748B",
            fontSize: "0.85rem",
            marginTop: "6px",
            fontWeight: 400
          }}>
            Sign in to access real-time lead analytics.
          </p>
        </div>

        <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <input
            type="email"
            required
            placeholder="Admin Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="premium-input"
          />

          <input
            type="password"
            required
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="premium-input"
          />

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "15px",
              borderRadius: "14px",
              border: "none",
              background: loading ? "#94A3B8" : "linear-gradient(135deg, #4CAF50, #2E7D32)",
              color: "#fff",
              fontWeight: 700,
              fontSize: "0.95rem",
              cursor: loading ? "not-allowed" : "pointer",
              transition: "all 0.3s ease",
              boxShadow: loading ? "none" : "0 4px 20px rgba(76,175,80,0.25)"
            }}
            onMouseOver={e => {
              if (!loading) e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseOut={e => {
              e.currentTarget.style.transform = "none";
            }}
          >
            {loading ? "Authenticating..." : "Login Securely"}
          </button>
        </form>

        {/* Divider */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          margin: "24px 0"
        }}>
          <span style={{ flex: 1, height: "1px", background: "rgba(15,23,42,0.08)" }} />
          <span style={{ fontSize: "0.72rem", color: "#94A3B8", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px" }}>Local Review Bypass</span>
          <span style={{ flex: 1, height: "1px", background: "rgba(15,23,42,0.08)" }} />
        </div>

        {/* Demo login bypass */}
        <button
          onClick={handleDemoBypass}
          style={{
            width: "100%",
            padding: "14px",
            borderRadius: "14px",
            background: "rgba(15,23,42,0.04)",
            border: "1.5px dashed rgba(15,23,42,0.15)",
            color: "#0F172A",
            fontWeight: 700,
            fontSize: "0.9rem",
            cursor: "pointer",
            transition: "all 0.3s ease",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px"
          }}
          onMouseOver={e => {
            e.currentTarget.style.background = "rgba(47,164,199,0.08)";
            e.currentTarget.style.borderColor = "#2FA4C7";
            e.currentTarget.style.color = "#2FA4C7";
            e.currentTarget.style.transform = "translateY(-1px)";
          }}
          onMouseOut={e => {
            e.currentTarget.style.background = "rgba(15,23,42,0.04)";
            e.currentTarget.style.borderColor = "rgba(15,23,42,0.15)";
            e.currentTarget.style.color = "#0F172A";
            e.currentTarget.style.transform = "none";
          }}
        >
          🚀 Test Demo Dashboard
        </button>

        <p style={{
          color: "#94A3B8",
          fontSize: "0.72rem",
          textAlign: "center",
          fontWeight: 400,
          lineHeight: 1.4,
          marginTop: "24px",
          margin: "24px 0 0"
        }}>
          Authorized access only. Real-time leads routing and administrative operations are subject to standard compliance checks.
        </p>
      </div>
    </div>
  );
}