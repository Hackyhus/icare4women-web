import siteContent from "@/config/siteContent.json";
import Button from "@/components/ui/Button";
import FadeIn from "@/components/ui/FadeIn";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Dr. Maryam",
  description: "Learn more about Dr. Maryam, her clinical focus, and her philosophy on private, structured online gynecological care.",
};

export default function AboutPage() {
  return (
    <div className="container" style={{ padding: "4rem 1.5rem 8rem" }}>
      {/* Doctor Photo + Intro — Same split layout as homepage */}
      <FadeIn>
        <div className="about-split" style={{
          display: "grid",
          gap: "0",
          borderRadius: "32px",
          overflow: "hidden",
          border: "1px solid var(--rc-border)",
          minHeight: "500px",
          marginBottom: "4rem"
        }}>
          {/* Photo Side */}
          <div style={{
            position: "relative",
            minHeight: "450px"
          }}>
            <img
              src="/images/dr-maryam-reading.jpg"
              alt="Dr. Maryam reading a medical journal"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center 20%",
                display: "block"
              }}
            />
            {/* Subtle dark overlay to blend with UI */}
            <div style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(135deg, rgba(45, 25, 35, 0.12) 0%, rgba(45, 25, 35, 0.25) 100%)",
              mixBlendMode: "multiply"
            }} />
          </div>
          {/* Text Side */}
          <div style={{
            padding: "3rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            backgroundColor: "var(--rc-bg)"
          }}>
            <p style={{
              fontSize: "0.85rem",
              fontWeight: "700",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: "var(--rc-primary)",
              marginBottom: "1rem"
            }}>
              Your Doctor
            </p>
            <h1 style={{
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: "800",
              marginBottom: "1rem",
              lineHeight: 1.15,
              letterSpacing: "-0.02em"
            }}>
              {siteContent.global.doctorName}
            </h1>
            <p style={{
              color: "var(--rc-primary-dark)",
              fontWeight: "600",
              fontSize: "1.1rem",
              marginBottom: "1.5rem"
            }}>
              Reproductive Health &amp; Gynecological Specialist
            </p>
            <p style={{
              color: "var(--rc-text-light)",
              lineHeight: 1.7,
              fontSize: "1.05rem"
            }}>
              Welcome. I am {siteContent.global.doctorName}, and I created {siteContent.global.projectName} to address a critical gap in women&apos;s healthcare: the need for private, expert, and structured gynecological guidance accessible from anywhere.
            </p>
          </div>
        </div>
      </FadeIn>

      {/* Bio Content */}
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <FadeIn delay={0.2}>
          <p style={{ marginBottom: "2rem", fontSize: "1.1rem", lineHeight: 1.8, color: "var(--rc-text-light)" }}>
            With years of clinical experience focusing on reproductive endocrinology, fertility strategies, and menstrual disorders, I understand that women&apos;s health concerns are often deeply personal and complex.
          </p>
        </FadeIn>

        <FadeIn delay={0.3}>
          <div className="glass" style={{ padding: "2rem", borderRadius: "20px", marginBottom: "2.5rem" }}>
             <h3 style={{ fontSize: "1.4rem", marginBottom: "1rem" }}>My Philosophy</h3>
             <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "1rem" }}>
               <li style={{ display: "flex", gap: "1rem" }}>
                 <span style={{ color: "var(--rc-primary)", fontSize: "1.2rem" }}>✦</span>
                 <div>
                   <strong>Clarity over confusion:</strong> We map out a clear path forward, eliminating the guesswork from your health journey.
                 </div>
               </li>
               <li style={{ display: "flex", gap: "1rem" }}>
                 <span style={{ color: "var(--rc-primary)", fontSize: "1.2rem" }}>✦</span>
                 <div>
                   <strong>Absolute Privacy:</strong> A safe, non-judgmental space where your medical history is protected.
                 </div>
               </li>
               <li style={{ display: "flex", gap: "1rem" }}>
                 <span style={{ color: "var(--rc-primary)", fontSize: "1.2rem" }}>✦</span>
                 <div>
                   <strong>Structured Plans:</strong> We don&apos;t just talk; you leave with actionable, evidence-based next steps.
                 </div>
               </li>
             </ul>
          </div>
        </FadeIn>

        <FadeIn delay={0.4}>
          <div>
             <h3 style={{ fontSize: "1.4rem", marginBottom: "1rem" }}>Why Online Care?</h3>
             <p style={{ color: "var(--rc-text-light)", marginBottom: "2rem", lineHeight: "1.7", fontSize: "1.05rem" }}>
               Not every concern requires an immediate physical exam. In fact, comprehensive history-taking and reviewing existing investigations often account for the majority of a correct diagnosis. Online consultations save you time, afford you comfort, and provide access to specialized care regardless of your physical location.
             </p>
             <Button href="/book" size="lg" showIcon>Book a Session with Me</Button>
          </div>
        </FadeIn>
      </div>

    </div>
  );
}
