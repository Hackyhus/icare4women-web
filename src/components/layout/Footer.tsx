import Link from "next/link";
import siteContent from "@/config/siteContent.json";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{
      backgroundColor: "var(--rc-surface)",
      borderTop: "1px solid var(--rc-border)",
      padding: "4rem 0 2rem",
      marginTop: "4rem"
    }}>
      <div className="container" style={{
        display: "flex",
        flexDirection: "column",
        gap: "2rem"
      }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: "1rem" }}>
          {/* Logo replica */}
          <div style={{
            width: "48px", height: "48px", borderRadius: "12px", 
            background: "linear-gradient(135deg, var(--rc-primary), var(--rc-primary-dark))", 
            display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: "bold", fontSize: "1.5rem",
            boxShadow: "var(--shadow-sm)"
          }}>
            RC
          </div>
          <h2 style={{ fontSize: "1.5rem", fontWeight: "600", color: "var(--rc-text-main)" }}>
            {siteContent.global.projectName}
          </h2>
          <p style={{ color: "var(--rc-text-light)", maxWidth: "400px", fontSize: "0.95rem" }}>
            Online reproductive and gynecological consultations.
          </p>
        </div>

        <nav style={{ display: "flex", justifyContent: "center", gap: "2rem", flexWrap: "wrap", marginTop: "1rem" }}>
          <Link href="/privacy-policy" style={{ color: "var(--rc-text-light)", fontSize: "0.9rem" }}>Privacy Policy</Link>
          <Link href="/terms" style={{ color: "var(--rc-text-light)", fontSize: "0.9rem" }}>Terms of Use</Link>
          <Link href="/faq" style={{ color: "var(--rc-text-light)", fontSize: "0.9rem" }}>FAQs</Link>
        </nav>

        <div style={{ textAlign: "center", marginTop: "2rem", paddingTop: "2rem", borderTop: "1px solid var(--rc-border)", color: "var(--rc-text-light)", fontSize: "0.85rem" }}>
          &copy; {currentYear} {siteContent.global.projectName}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
