import type { Metadata } from "next";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Resources & Articles",
  description: "Coming soon: A library of reproductive health and wellness resources.",
};

export default function ResourcesPage() {
  return (
    <div className="container" style={{ padding: "8rem 1.5rem", textAlign: "center", maxWidth: "600px", minHeight: "60vh", display: "flex", flexDirection: "column", justifyContent: "center" }}>
      <div style={{ 
        width: "80px", height: "80px", borderRadius: "50%", 
        backgroundColor: "var(--rc-primary-light)",
        color: "var(--rc-primary-dark)",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: "2rem",
        margin: "0 auto 2rem"
      }}>
        📚
      </div>
      <h1 style={{ fontSize: "3rem", marginBottom: "1rem" }}>Resources</h1>
      <p style={{ fontSize: "1.2rem", color: "var(--rc-text-light)", marginBottom: "3rem" }}>
        We are building a comprehensive library of articles, guides, and tools to support your health journey. Check back soon!
      </p>
      <div>
        <Button href="/">Back to Home</Button>
      </div>
    </div>
  );
}
