"use client";

import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { useRouter } from "next/navigation";
import FadeIn from "@/components/ui/FadeIn";
import Link from "next/link";
import { UserPlus } from "lucide-react";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;

      // Create initial user doc with 'patient' role
      await setDoc(doc(db, "users", uid), {
        name,
        email,
        role: "patient",
        createdAt: serverTimestamp(),
        profileCompleted: false
      });

      // Redirect to intake form
      router.push("/profile/complete");
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : 'Failed to create account.';
      setError(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ padding: "4rem 1.5rem 8rem", maxWidth: "500px" }}>
      <FadeIn>
        <div className="glass-glow" style={{ padding: "3rem", borderRadius: "32px", textAlign: "center" }}>
          <div style={{ width: "64px", height: "64px", borderRadius: "20px", backgroundColor: "var(--rc-primary-light)", color: "var(--rc-primary-dark)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem" }}>
            <UserPlus size={32} />
          </div>
          
          <h1 className="text-gradient" style={{ fontSize: "2.5rem", marginBottom: "1rem", fontWeight: "700" }}>Create Account</h1>
          <p style={{ color: "var(--rc-text-light)", marginBottom: "2.5rem" }}>Join iCare4Women for secure telehealth consultations.</p>

          <form onSubmit={handleSignup} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {error && <div style={{ color: "#e74c3c", backgroundColor: "rgba(231, 76, 60, 0.1)", padding: "0.8rem", borderRadius: "8px", fontSize: "0.9rem" }}>{error}</div>}
            
            <div style={{ textAlign: "left" }}>
              <label style={{ display: "block", marginBottom: "0.5rem", color: "var(--rc-text-main)", fontWeight: "600" }}>Full Name</label>
              <input 
                type="text" required placeholder="Aisha Suleiman" value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ width: "100%", padding: "1rem", borderRadius: "14px", border: "1px solid var(--rc-border)", outline: "none", fontSize: "1rem" }}
              />
            </div>

            <div style={{ textAlign: "left" }}>
              <label style={{ display: "block", marginBottom: "0.5rem", color: "var(--rc-text-main)", fontWeight: "600" }}>Email Address</label>
              <input 
                type="email" required placeholder="aisha@example.com" value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ width: "100%", padding: "1rem", borderRadius: "14px", border: "1px solid var(--rc-border)", outline: "none", fontSize: "1rem" }}
              />
            </div>

            <div style={{ textAlign: "left" }}>
              <label style={{ display: "block", marginBottom: "0.5rem", color: "var(--rc-text-main)", fontWeight: "600" }}>Password</label>
              <input 
                type="password" required placeholder="••••••••" value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ width: "100%", padding: "1rem", borderRadius: "14px", border: "1px solid var(--rc-border)", outline: "none", fontSize: "1rem" }}
              />
            </div>

            <button 
              type="submit" disabled={loading}
              style={{ 
                marginTop: "1rem", padding: "1.2rem", borderRadius: "14px", backgroundColor: "var(--rc-primary)", color: "#fff", fontWeight: "700", fontSize: "1.1rem", border: "none", cursor: loading ? "not-allowed" : "pointer", transition: "all 0.3s ease",
                boxShadow: "0 10px 20px rgba(188, 122, 147, 0.3)"
              }}
            >
              {loading ? "Creating Account..." : "Sign Up Securely"}
            </button>
          </form>

          <p style={{ marginTop: "2rem", color: "var(--rc-text-light)", fontSize: "0.95rem" }}>
            Already have an account? <Link href="/login" style={{ color: "var(--rc-primary-dark)", fontWeight: "700", textDecoration: "none" }}>Log In</Link>
          </p>
        </div>
      </FadeIn>
    </div>
  );
}
