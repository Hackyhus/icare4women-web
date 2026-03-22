"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { 
  LayoutDashboard, 
  Users, 
  MessageSquare, 
  Calendar, 
  FileText, 
  Settings,
  LogOut,
  Sparkles,
  Activity
} from "lucide-react";
import { usePathname } from "next/navigation";
import DoctorGuard from "@/components/doctor/DoctorGuard";

import FloatingNav from "@/components/ui/FloatingNav";

export default function DoctorLayout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", href: "/doctor", icon: <LayoutDashboard size={20} /> },
    { name: "Patients", href: "/doctor/patients", icon: <Users size={20} /> },
    { name: "Messages", href: "/doctor/messages", icon: <MessageSquare size={20} /> },
    { name: "Prescriptions", href: "/doctor/prescriptions", icon: <FileText size={20} /> },
    { name: "Lab Requests", href: "/doctor/lab-requests/new", icon: <Activity size={20} /> },
  ];

  return (
    <DoctorGuard>
      <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "var(--rc-bg)" }}>
      {/* Sidebar - Hidden on mobile */}
      <aside className="sidebar-desktop" style={{ 
        width: "280px", 
        backgroundColor: "var(--rc-surface)", 
        borderRight: "1px solid var(--rc-border)",
        display: "flex",
        flexDirection: "column",
        position: "sticky",
        top: 0,
        height: "100vh"
      }}>
        <div style={{ padding: "2rem", borderBottom: "1px solid var(--rc-border)" }}>
          <Link href="/doctor" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
            <div style={{ 
              backgroundColor: "var(--rc-primary)", 
              color: "white", 
              width: "32px", 
              height: "32px", 
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bold"
            }}>i</div>
            <span style={{ fontWeight: "700", fontSize: "1.2rem", color: "var(--rc-text-main)" }}>
              Doctor Portal
            </span>
          </Link>
        </div>

        <nav style={{ flex: 1, padding: "1.5rem 1rem" }}>
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.name} 
                href={item.href}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "0.8rem 1rem",
                  borderRadius: "12px",
                  textDecoration: "none",
                  marginBottom: "0.5rem",
                  color: isActive ? "var(--rc-primary-dark)" : "var(--rc-text-light)",
                  backgroundColor: isActive ? "var(--rc-primary-light)" : "transparent",
                  fontWeight: isActive ? "600" : "500",
                  transition: "all 0.2s ease"
                }}
              >
                {item.icon}
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div style={{ padding: "1.5rem", borderTop: "1px solid var(--rc-border)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "1.5rem" }}>
            <div style={{ 
              width: "40px", height: "40px", borderRadius: "50%", 
              backgroundColor: "var(--rc-primary-light)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "1.2rem"
            }}>👩‍⚕️</div>
            <div style={{ overflow: "hidden" }}>
              <div style={{ fontWeight: "600", fontSize: "0.9rem", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>
                Dr. Maryam
              </div>
              <div style={{ fontSize: "0.75rem", color: "var(--rc-text-light)" }}>
                Administrator
              </div>
            </div>
          </div>
          <button 
            onClick={() => logout()}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "0.8rem",
              borderRadius: "12px",
              border: "1px solid var(--rc-border)",
              backgroundColor: "transparent",
              color: "#e74c3c",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.2s ease"
            }}
          >
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: "2rem", overflowY: "auto", maxWidth: "100%" }}>
        {children}
      </main>

      <FloatingNav />
    </div>
    </DoctorGuard>
  );
}
