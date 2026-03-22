import siteContent from "@/config/siteContent.json";
import Button from "@/components/ui/Button";
import FadeIn from "@/components/ui/FadeIn";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Dr. Maryam",
  description: "Learn more about Dr. Maryam, her clinical focus, and her philosophy on private, structured online gynecological care.",
};

export default function AboutPage() {
  return (
    <div>
      {/* Hero Banner with Doctor Photo */}
      <section style={{
        position: "relative",
        minHeight: "60vh",
        display: "flex",
        alignItems: "flex-end",
        overflow: "hidden",
        borderRadius: "0 0 32px 32px"
      }}>
        {/* Background Image */}
        <Image
          src="/images/dr-maryam-reading.jpg"
          alt="Dr. Maryam reading a medical journal"
          fill
          priority
          style={{
            objectFit: "cover",
            objectPosition: "center 20%"
          }}
        />
        {/* Dark gradient overlay for readability */}
        <div style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to top, rgba(45, 25, 35, 0.85) 0%, rgba(45, 25, 35, 0.4) 50%, rgba(45, 25, 35, 0.15) 100%)",
          zIndex: 1
        }} />
        {/* Text content over the image */}
        <div className="container" style={{
          position: "relative",
          zIndex: 2,
          padding: "4rem 1.5rem",
          color: "#fff"
        }}>
          <FadeIn delay={0.2}>
            <p style={{
              fontSize: "0.9rem",
              fontWeight: "600",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              marginBottom: "0.75rem",
              color: "rgba(255, 200, 220, 0.9)"
            }}>
              Your Doctor
            </p>
            <h1 style={{
              fontSize: "clamp(2.5rem, 6vw, 4rem)",
              fontWeight: "800",
              marginBottom: "0.5rem",
              lineHeight: 1.1,
              letterSpacing: "-0.02em"
            }}>
              {siteContent.global.doctorName}
            </h1>
            <p style={{
              fontSize: "1.15rem",
              opacity: 0.85,
              maxWidth: "500px"
            }}>
              Reproductive Health &amp; Gynecological Specialist
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Bio Section */}
      <div className="container" style={{ padding: "4rem 1.5rem 8rem" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <FadeIn delay={0.2}>
            <div style={{ marginBottom: "3rem", lineHeight: "1.8", color: "var(--rc-text-light)" }}>
              <p style={{ marginBottom: "1rem", fontSize: "1.1rem" }}>
                Welcome. I am {siteContent.global.doctorName}, and I created {siteContent.global.projectName} to address a critical gap in women&apos;s healthcare: the need for private, expert, and structured gynecological guidance accessible from anywhere.
              </p>
              <p style={{ marginBottom: "1rem", fontSize: "1.1rem" }}>
                With years of clinical experience focusing on reproductive endocrinology, fertility strategies, and menstrual disorders, I understand that women&apos;s health concerns are often deeply personal and complex.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.4}>
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

          <FadeIn delay={0.6}>
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
    </div>
  );
}
