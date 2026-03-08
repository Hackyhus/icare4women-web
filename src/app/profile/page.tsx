"use client";

import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import FadeIn from "@/components/ui/FadeIn";

export default function ProfilePage() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  // Redirect if not logged in
  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="container" style={{ padding: "4rem 1.5rem 8rem", textAlign: "center", minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ fontSize: "1.2rem", color: "var(--rc-text-light)" }}>Authenticating Patient Records...</div>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: "4rem 1.5rem 8rem", maxWidth: "900px" }}>
      <FadeIn>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "3rem", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <h1 className="text-gradient" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", marginBottom: "0.5rem", fontWeight: "700" }}>Patient Portal</h1>
            <p style={{ color: "var(--rc-text-light)", fontSize: "1.1rem" }}>Welcome back, <strong style={{ color: "var(--rc-primary-dark)" }}>{user.email}</strong></p>
          </div>
          <button 
            onClick={() => logout()}
            style={{
              padding: "0.8rem 1.5rem",
              borderRadius: "12px",
              backgroundColor: "rgba(231, 76, 60, 0.1)",
              color: "#e74c3c",
              border: "1px solid rgba(231, 76, 60, 0.3)",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.3s ease"
            }}
          >
            Sign Out
          </button>
        </div>
      </FadeIn>

      <FadeIn delay={0.2}>
        <div className="glass-glow" style={{ padding: "3rem", borderRadius: "24px", minHeight: "300px" }}>
          <h2 style={{ fontSize: "1.5rem", color: "var(--rc-primary-dark)", marginBottom: "2rem", borderBottom: "1px solid var(--rc-border)", paddingBottom: "1rem" }}>
            EHR Documentation / Consultation History
          </h2>
          
          <div style={{ textAlign: "center", padding: "3rem", color: "var(--rc-text-light)", backgroundColor: "rgba(255,255,255,0.4)", borderRadius: "16px", border: "1px dashed var(--rc-border)" }}>
            <p style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>No active medical records found.</p>
            <p style={{ fontSize: "0.95rem", opacity: 0.8 }}>Consultation notes, prescriptions, and diagnoses from Dr. Maryam will securely appear here after your session.</p>
          </div>
        </div>
      </FadeIn>
    </div>
  );
}
