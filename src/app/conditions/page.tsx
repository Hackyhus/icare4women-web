import siteContent from "@/config/siteContent.json";
import Button from "@/components/ui/Button";
import Link from "next/link";
import FadeIn from "@/components/ui/FadeIn";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Conditions We Help With",
  description: "Comprehensive care and evaluation for PCOS, Infertility, Menopause, and other gynecological conditions.",
};

export default function ConditionsPage() {
  const { conditions } = siteContent;

  return (
    <div className="container" style={{ padding: "4rem 1.5rem 8rem" }}>
      {/* Header */}
      <FadeIn>
        <div style={{ textAlign: "center", marginBottom: "4rem", maxWidth: "800px", margin: "0 auto 4rem" }}>
          <h1 style={{ fontSize: "3rem", marginBottom: "1rem" }}>Conditions We Help With</h1>
          <p style={{ fontSize: "1.1rem", color: "var(--rc-text-light)", marginBottom: "2rem" }}>
            Expert evaluation, detailed insights, and structured symptom management. Choose a condition below to learn more about our approach.
          </p>
          
          {/* Anchor Menu */}
          <div style={{ 
            display: "flex", 
            flexWrap: "wrap", 
            justifyContent: "center", 
            gap: "1rem" 
          }}>
            {conditions.map((c) => (
              <Link 
                key={"anchor-" + c.id} 
                href={"#" + c.id}
                className="hover-lift"
                style={{
                  padding: "0.5rem 1rem",
                  backgroundColor: "var(--rc-surface)",
                  border: "1px solid var(--rc-border)",
                  borderRadius: "50px",
                  fontSize: "0.9rem",
                  color: "var(--rc-text-main)",
                  boxShadow: "var(--shadow-sm)"
                }}
              >
                {c.title}
              </Link>
            ))}
          </div>
        </div>
      </FadeIn>

      {/* Condition Sections */}
      <div style={{ display: "flex", flexDirection: "column", gap: "6rem" }}>
        {conditions.map((condition, index) => (
          <FadeIn key={condition.id} delay={0.1 * index}>
            <section 
              id={condition.id} 
              style={{ 
                paddingTop: "6rem", 
                marginTop: "-6rem", /* Offset for fixed header anchor jump */
              }}
            >
              <div className="glass-glow" style={{
                padding: "3rem",
                borderRadius: "24px",
              }}>
                <h2 style={{ fontSize: "2.2rem", marginBottom: "2rem", color: "var(--rc-primary-dark)", borderBottom: "2px solid var(--rc-border)", paddingBottom: "1rem" }}>
                  {condition.title}
                </h2>
                
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2rem" }}>
                  {/* Left Column */}
                  <div>
                    <h3 style={{ fontSize: "1.2rem", marginBottom: "1rem", color: "var(--rc-text-main)" }}>Common Symptoms</h3>
                    <ul style={{ paddingLeft: "1.2rem", marginBottom: "2rem", color: "var(--rc-text-light)" }}>
                      {condition.symptoms.map((s, i) => <li key={i} style={{ marginBottom: "0.5rem" }}>{s}</li>)}
                    </ul>

                    <h3 style={{ fontSize: "1.2rem", marginBottom: "1rem", color: "var(--rc-text-main)" }}>Common Causes</h3>
                    <ul style={{ paddingLeft: "1.2rem", marginBottom: "2rem", color: "var(--rc-text-light)" }}>
                      {condition.causes.map((c, i) => <li key={i} style={{ marginBottom: "0.5rem" }}>{c}</li>)}
                    </ul>
                    
                    <div style={{ 
                      padding: "1.5rem", 
                      backgroundColor: "rgba(209, 162, 181, 0.1)", /* very light primary variant */
                      borderRadius: "12px",
                      borderLeft: "4px solid var(--rc-primary)"
                    }}>
                      <h4 style={{ fontSize: "1.1rem", marginBottom: "0.5rem", color: "var(--rc-primary-dark)" }}>When to Worry (Red Flags)</h4>
                      <ul style={{ paddingLeft: "1.2rem", margin: 0, color: "var(--rc-text-main)", fontSize: "0.95rem" }}>
                        {condition.redFlags.map((r, i) => <li key={i}>{r}</li>)}
                      </ul>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div>
                    <h3 style={{ fontSize: "1.2rem", marginBottom: "1rem", color: "var(--rc-text-main)" }}>How Evaluation Works</h3>
                    <p style={{ color: "var(--rc-text-light)", marginBottom: "2rem", lineHeight: "1.7" }}>
                      {condition.evaluation}
                    </p>

                    <h3 style={{ fontSize: "1.2rem", marginBottom: "1rem", color: "var(--rc-text-main)" }}>How Treatment is Decided</h3>
                    <p style={{ color: "var(--rc-text-light)", marginBottom: "2.5rem", lineHeight: "1.7" }}>
                      {condition.treatment}
                    </p>
                    
                    <div style={{ marginTop: "2rem" }}>
                      <Button href={"/book?condition=" + condition.id} showIcon>
                        Book Consultation for {condition.title}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}
