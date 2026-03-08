"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import siteContent from "@/config/siteContent.json";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Conditions", href: "/conditions" },
    { name: "About", href: "/about" },
    { name: "FAQs", href: "/faq" },
    { name: "Patient Portal", href: "/login" },
  ];

  return (
    <header
      style={{
        position: "fixed",
        zIndex: 50,
        top: isScrolled ? "10px" : "20px",
        left: "50%",
        transform: "translateX(-50%)",
        width: "calc(100% - 40px)",
        maxWidth: "1200px",
        padding: isScrolled ? "0.6rem 0" : "1.2rem 0",
        borderRadius: "20px",
        backgroundColor: isScrolled ? "var(--rc-glass-bg)" : "var(--rc-glass-bg-trans)",
        backdropFilter: "blur(12px)",
        border: `1px solid var(--rc-glass-border)`,
        boxShadow: isScrolled ? "var(--shadow-md)" : "var(--shadow-sm)",
        transition: "all var(--transition-normal)",
      }}
    >
      <div style={{ padding: "0 1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        {/* Logo */}
        <Link href="/" className="hover-lift" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{
            width: "40px", height: "40px", borderRadius: "12px", 
            background: "linear-gradient(135deg, var(--rc-primary), var(--rc-primary-dark))", 
            display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: "bold", fontSize: "1.2rem",
            boxShadow: "var(--shadow-sm)"
          }}>
            RC
          </div>
          <span style={{ fontSize: "1.3rem", fontWeight: "600", color: "var(--rc-text-main)", letterSpacing: "-0.5px" }}>
            {siteContent.global.projectName}
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav style={{ display: "none" }} className="desktop-nav">
          <ul style={{ display: "flex", gap: "2rem", listStyle: "none", margin: 0, padding: 0 }}>
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  style={{ fontWeight: "500", color: "var(--rc-text-light)", textDecoration: "none", fontSize: "0.95rem" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--rc-primary-dark)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--rc-text-light)")}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Action Button & Mobile Toggle */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <div className="desktop-cta">
            <Link
              href="/book"
              className="hover-lift"
              style={{
                padding: "0.6rem 1.4rem",
                backgroundColor: "var(--rc-primary)",
                color: "#fff",
                borderRadius: "50px",
                fontWeight: "500",
                fontSize: "0.95rem",
                boxShadow: "var(--shadow-sm)",
                textDecoration: "none"
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              Book Consultation
            </Link>
          </div>
          
          <button
            className="mobile-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            style={{
              background: "none", border: "none", fontSize: "1.5rem", color: "var(--rc-text-main)", cursor: "pointer", display: "none"
            }}
          >
            ☰
          </button>
        </div>
      </div>
      
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          style={{
            position: "fixed", 
            top: 0, 
            left: 0, 
            width: "100vw", 
            height: "100vh", 
            backgroundColor: "var(--rc-surface)",
            zIndex: 100,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "2rem"
          }}
        >
          {/* Close Button */}
          <button 
            onClick={() => setIsMobileMenuOpen(false)}
            style={{
              position: "absolute",
              top: "20px",
              right: "20px",
              background: "none",
              border: "none",
              fontSize: "2rem",
              color: "var(--rc-text-main)",
              cursor: "pointer"
            }}
          >
            ✕
          </button>

          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: "2rem" }}>
             {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  style={{ fontWeight: "500", color: "var(--rc-text-main)", fontSize: "1.5rem", textDecoration: "none" }}
                >
                  {link.name}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/book"
                onClick={() => setIsMobileMenuOpen(false)}
                style={{
                  display: "inline-block",
                  marginTop: "1rem",
                  padding: "1rem 2rem",
                  backgroundColor: "var(--rc-primary)",
                  color: "#fff",
                  borderRadius: "50px",
                  fontWeight: "600",
                  fontSize: "1.1rem",
                  textDecoration: "none",
                  boxShadow: "var(--shadow-sm)"
                }}
              >
                Book Consultation
              </Link>
            </li>
          </ul>
        </div>
      )}

      {/* Media Queries for Navbar responsive behavior */}
      <style jsx>{`
        .desktop-nav { display: none !important; }
        .desktop-cta { display: none !important; }
        .mobile-toggle { display: block !important; }

        @media (min-width: 850px) {
          .desktop-nav { display: block !important; }
          .desktop-cta { display: block !important; }
          .mobile-toggle { display: none !important; }
        }
      `}</style>
    </header>
  );
}
