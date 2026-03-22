"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DoctorGuard({ children }: { children: React.ReactNode }) {
  const { user, userData, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push("/login");
      } else if (userData?.role !== 'doctor') {
        router.push("/profile"); // Redirect patients to their portal
      }
    }
  }, [user, userData, loading, router]);

  if (loading || !user || userData?.role !== 'doctor') {
    return (
      <div style={{ 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center", 
        minHeight: "100vh",
        backgroundColor: "var(--rc-bg)"
      }}>
        <div style={{ color: "var(--rc-primary-dark)", fontSize: "1.1rem" }}>
          Accessing Doctor Portal...
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
