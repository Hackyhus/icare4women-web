"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface AuthGuardProps {
  children: React.ReactNode;
  requiredRole?: 'patient' | 'doctor';
}

export default function AuthGuard({ children, requiredRole }: AuthGuardProps) {
  const { user, userData, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push("/login");
      } else if (requiredRole && userData?.role !== requiredRole) {
        // Redirect to the correct portal based on their actual role
        if (userData?.role === 'doctor') {
          router.push("/doctor");
        } else {
          router.push("/profile");
        }
      }
    }
  }, [user, userData, loading, router, requiredRole]);

  if (loading || !user) {
    return (
      <div style={{ 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center", 
        minHeight: "100vh",
        backgroundColor: "var(--rc-bg)"
      }}>
        <div style={{ 
          display: "flex", 
          flexDirection: "column", 
          alignItems: "center", 
          gap: "1.5rem" 
        }}>
          <div style={{
            width: "48px",
            height: "48px",
            borderRadius: "50%",
            border: "4px solid var(--rc-primary-light)",
            borderTopColor: "var(--rc-primary)",
            animation: "spin 1s linear infinite"
          }} />
          <p style={{ color: "var(--rc-text-light)", fontWeight: "500" }}>
            Verifying access...
          </p>
          <style jsx>{`
            @keyframes spin {
              to { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      </div>
    );
  }

  // If a role is required and doesn't match, show nothing while redirecting
  if (requiredRole && userData?.role !== requiredRole) {
    return null;
  }

  return <>{children}</>;
}
