"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import FadeIn from "@/components/ui/FadeIn";
import { Sparkles } from "lucide-react";

export default function DoctorLoginPage() {
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
      
      // Verify role before allowing access to doctor portal
      const docSnap = await getDoc(doc(db, "users", uid));
      const userData = docSnap.data();

      if (userData?.role === 'doctor') {
        router.push("/doctor");
      } else {
        setError("Unauthorized access. This portal is for doctors only.");
        await auth.signOut();
      }
    } catch (err: any) {
      setError("Invalid credentials or access denied.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ 
      padding: "4rem 1.5rem", 
      maxWidth: "500px", 
      minHeight: "100vh", 
      display: "flex", 
      alignItems: "center" 
    }}>
      <FadeIn>
        <div className="glass-glow" style={{ padding: "3rem", borderRadius: "32px", textAlign: "center" }}>
          <div style={{ 
            display: "inline-flex", 
            padding: "1rem", 
            borderRadius: "20px", 
            backgroundColor: "var(--rc-primary-light)", 
            color: "var(--rc-primary-dark)",
            marginBottom: "1.5rem"
          }}>
            <Sparkles size={32} />
          </div>
          
          <h1 className="text-gradient" style={{ fontSize: "2.2rem", marginBottom: "0.5rem", fontWeight: "700" }}>Doctor Portal</h1>
          <p style={{ color: "var(--rc-text-light)", marginBottom: "2.5rem" }}>Secure access for Dr. Maryam.</p>

          <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
            {error && (
              <div style={{ 
                color: "#e74c3c", 
                backgroundColor: "rgba(231, 76, 60, 0.1)", 
                padding: "0.8rem", 
                borderRadius: "12px", 
                fontSize: "0.9rem",
                border: "1px solid rgba(231, 76, 60, 0.2)"
              }}>
                {error}
              </div>
            )}
            
            <div style={{ textAlign: "left" }}>
              <label style={{ display: "block", marginBottom: "0.5rem", color: "var(--rc-text-main)", fontWeight: "600", fontSize: "0.9rem" }}>Work Email</label>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="drmaryam@icare4women.com"
                style={{ 
                  width: "100%", padding: "1.2rem", borderRadius: "16px", 
                  border: "1px solid var(--rc-border)", outline: "none", fontSize: "1rem",
                  backgroundColor: "rgba(255,255,255,0.5)"
                }}
              />
            </div>

            <div style={{ textAlign: "left" }}>
              <label style={{ display: "block", marginBottom: "0.5rem", color: "var(--rc-text-main)", fontWeight: "600", fontSize: "0.9rem" }}>Secure Password</label>
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                style={{ 
                  width: "100%", padding: "1.2rem", borderRadius: "16px", 
                  border: "1px solid var(--rc-border)", outline: "none", fontSize: "1rem",
                  backgroundColor: "rgba(255,255,255,0.5)"
                }}
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="hover-lift"
              style={{ 
                marginTop: "1.5rem", padding: "1.2rem", borderRadius: "16px", 
                backgroundColor: "var(--rc-primary-dark)", color: "#fff", fontWeight: "600",
                fontSize: "1.1rem", border: "none", cursor: loading ? "not-allowed" : "pointer",
                boxShadow: "0 10px 20px -10px var(--rc-primary-dark)"
              }}
            >
              {loading ? "Verifying..." : "Authorize Access"}
            </button>
          </form>
        </div>
      </FadeIn>
    </div>
  );
}
