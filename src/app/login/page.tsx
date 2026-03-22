"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import FadeIn from "@/components/ui/FadeIn";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;

      // Check role for smart redirection
      const { doc, getDoc } = await import("firebase/firestore");
      const { db } = await import("@/lib/firebase");
      const docSnap = await getDoc(doc(db, "users", uid));
      const userData = docSnap.data();

      if (userData?.role === 'doctor') {
        router.push("/doctor");
      } else {
        router.push("/profile");
      }
    } catch {
      setError("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ padding: "4rem 1.5rem 8rem", maxWidth: "500px" }}>
      <FadeIn>
        <div className="glass-glow" style={{ padding: "3rem", borderRadius: "24px", textAlign: "center" }}>
          <h1 className="text-gradient" style={{ fontSize: "2.5rem", marginBottom: "1rem", fontWeight: "700" }}>Patient Portal</h1>
          <p style={{ color: "var(--rc-text-light)", marginBottom: "2.5rem" }}>Sign in to view your consultation history securely.</p>

          <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {error && <div style={{ color: "#e74c3c", backgroundColor: "rgba(231, 76, 60, 0.1)", padding: "0.8rem", borderRadius: "8px", fontSize: "0.9rem" }}>{error}</div>}
            
            <div style={{ textAlign: "left" }}>
              <label style={{ display: "block", marginBottom: "0.5rem", color: "var(--rc-text-main)", fontWeight: "500" }}>Email Address</label>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ 
                  width: "100%", padding: "1rem", borderRadius: "12px", 
                  border: "1px solid var(--rc-border)", outline: "none", fontSize: "1rem" 
                }}
              />
            </div>

            <div style={{ textAlign: "left" }}>
              <label style={{ display: "block", marginBottom: "0.5rem", color: "var(--rc-text-main)", fontWeight: "500" }}>Password</label>
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ 
                  width: "100%", padding: "1rem", borderRadius: "12px", 
                  border: "1px solid var(--rc-border)", outline: "none", fontSize: "1rem" 
                }}
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              style={{ 
                marginTop: "1rem", padding: "1.2rem", borderRadius: "12px", 
                backgroundColor: "var(--rc-primary)", color: "#fff", fontWeight: "600",
                fontSize: "1.1rem", border: "none", cursor: loading ? "not-allowed" : "pointer",
                opacity: loading ? 0.7 : 1, transition: "all 0.3s ease"
              }}
            >
              {loading ? "Authenticating..." : "Secure Login"}
            </button>
          </form>

          <p style={{ marginTop: "2rem", color: "var(--rc-text-light)", fontSize: "0.95rem" }}>
            Don&apos;t have an account? <Link href="/signup" style={{ color: "var(--rc-primary-dark)", fontWeight: "700", textDecoration: "none" }}>Sign Up</Link>
          </p>
        </div>
      </FadeIn>
    </div>
  );
}
