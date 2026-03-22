"use client";

import FloatingNav from "@/components/ui/FloatingNav";
import AuthGuard from "@/components/auth/AuthGuard";

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard requiredRole="patient">
      <div style={{ minHeight: "100vh", backgroundColor: "var(--rc-bg)" }}>
        <main className="container" style={{ padding: "1rem 1.5rem" }}>
          {children}
        </main>
        <FloatingNav />
      </div>
    </AuthGuard>
  );
}
