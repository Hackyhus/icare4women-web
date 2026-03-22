"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Home, MessageSquare, Clipboard, User, Calendar } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function FloatingNav() {
  const pathname = usePathname();
  const { userData } = useAuth();
  
  if (!userData) return null;

  const isDoctor = userData.role === 'doctor';

  const navItems = isDoctor ? [
    { name: "Home", icon: <Home size={24} />, path: "/doctor" },
    { name: "Patients", icon: <Calendar size={24} />, path: "/doctor/patients" },
    { name: "Messages", icon: <MessageSquare size={24} />, path: "/doctor/messages" },
  ] : [
    { name: "Home", icon: <Home size={24} />, path: "/profile" },
    { name: "Book", icon: <Calendar size={24} />, path: "/book" },
    { name: "Records", icon: <Clipboard size={24} />, path: "/profile/records" },
    { name: "Profile", icon: <User size={24} />, path: "/profile" },
  ];

  return (
    <div className="mobile-only" style={{ 
      position: "fixed", 
      bottom: "1.5rem", 
      left: "50%", 
      transform: "translateX(-50%)", 
      zIndex: 1000,
      width: "min(90vw, 400px)",
      display: "flex",
      justifyContent: "center"
    }}>
      <div className="glass-glow" style={{ 
        display: "flex", 
        justifyContent: "space-around",
        width: "100%",
        padding: "0.75rem 1rem", 
        borderRadius: "24px",
        border: "1px solid var(--rc-primary-light)",
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        boxShadow: "0 8px 32px rgba(188, 122, 147, 0.15)"
      }}>
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link 
              key={item.name} 
              href={item.path} 
              style={{ 
                display: "flex", 
                flexDirection: "column", 
                alignItems: "center", 
                gap: "4px",
                color: isActive ? "var(--rc-primary)" : "var(--rc-text-light)",
                transition: "all 0.3s ease",
                transform: isActive ? "scale(1.1) translateY(-4px)" : "scale(1)",
                textDecoration: "none"
              }}
            >
              <div style={{ 
                width: "40px", 
                height: "40px", 
                borderRadius: "50%", 
                backgroundColor: isActive ? "rgba(188, 122, 147, 0.1)" : "transparent",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}>
                {item.icon}
              </div>
              <span style={{ fontSize: "0.65rem", fontWeight: "700", textTransform: "uppercase" }}>{item.name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
