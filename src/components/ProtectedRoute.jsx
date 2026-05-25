import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { Navigate } from "react-router-dom";
import { auth } from "../firebase";

export default function ProtectedRoute({ children }) {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    // Check if developer bypass mode is active
    const bypass = localStorage.getItem("adminBypass") === "true";
    if (bypass) {
      setUser({ email: "info@nxtweavesolutions.com", displayName: "Demo Admin" });
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  if (user === undefined) {
    return (
      <div style={{
        minHeight: "100vh", 
        display: "flex", 
        alignItems: "center",
        justifyContent: "center", 
        background: "#050C16", 
        color: "#8FA3B4",
        fontFamily: "'DM Sans', sans-serif"
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
          <p style={{ fontSize: "0.85rem", letterSpacing: "1.5px", fontWeight: 500 }}>
            VERIFYING ADVISORY CREDENTIALS...
          </p>
          <style>{`
            @keyframes spin { to { transform: rotate(360deg); } }
          `}</style>
        </div>
      </div>
    );
  }

  return user ? children : <Navigate to="/admin" />;
}