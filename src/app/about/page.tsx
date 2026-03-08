import Image from "next/image";
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
      <div style={{ display: "flex", flexWrap: "wrap", gap: "4rem", alignItems: "center" }}>
        {/* Headshot Area */}
        <div style={{ flex: "1 1 400px", position: "relative" }}>
          <FadeIn>
            <div style={{ 
              position: "relative", 
              width: "100%", 
              aspectRatio: "1/1", 
              borderRadius: "30px", 
              overflow: "hidden",
              boxShadow: "var(--shadow-lg)",
              border: "8px solid #fff"
            }}>
              <Image 
                src="/images/doctor-profile.png" 
                alt="Dr. Maryam" 
                fill 
                style={{ objectFit: "cover" }} 
              />
            </div>
            {/* Decorative element */}
            <div style={{ 
              position: "absolute", 
              bottom: "-20px", 
              right: "-20px", 
              width: "140px", 
              height: "140px", 
              backgroundColor: "var(--rc-primary-light)", 
              borderRadius: "50%", 
              zIndex: -1 
            }} />
          </FadeIn>
        </div>

        {/* Content Area */}
        <div style={{ flex: "1 1 500px" }}>
          <FadeIn delay={0.2}>
            <h1 style={{ fontSize: "3rem", marginBottom: "0.5rem" }}>{siteContent.global.doctorName}</h1>
            <h2 style={{ fontSize: "1.2rem", color: "var(--rc-primary-dark)", fontWeight: "500", marginBottom: "2rem" }}>
              Reproductive Health & Gynecological Specialist
            </h2>

            <div style={{ marginBottom: "2rem", lineHeight: "1.8", color: "var(--rc-text-light)" }}>
              <p style={{ marginBottom: "1rem" }}>
                Welcome. I am {siteContent.global.doctorName}, and I created {siteContent.global.projectName} to address a critical gap in women&apos;s healthcare: the need for private, expert, and structured gynecological guidance accessible from anywhere.
              </p>
              <p style={{ marginBottom: "1rem" }}>
                With years of clinical experience focusing on reproductive endocrinology, fertility strategies, and menstrual disorders, I understand that women&apos;s health concerns are often deeply personal and complex. 
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.4}>
            <div className="glass" style={{ padding: "2rem", borderRadius: "20px", marginBottom: "2.5rem" }}>
               <h3 style={{ fontSize: "1.4rem", marginBottom: "1rem" }}>My Philosophy</h3>
               <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "1rem" }}>
                 <li style={{ display: "flex", gap: "1rem" }}>
                   <span style={{ color: "var(--rc-primary)" }}>✦</span>
                   <div>
                     <strong>Clarity over confusion:</strong> We mapping out a clear path forward, eliminating the guesswork from your health journey.
                   </div>
                 </li>
                 <li style={{ display: "flex", gap: "1rem" }}>
                   <span style={{ color: "var(--rc-primary)" }}>✦</span>
                   <div>
                     <strong>Absolute Privacy:</strong> A safe, non-judgmental space where your medical history is protected.
                   </div>
                 </li>
                 <li style={{ display: "flex", gap: "1rem" }}>
                   <span style={{ color: "var(--rc-primary)" }}>✦</span>
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
               <p style={{ color: "var(--rc-text-light)", marginBottom: "2rem", lineHeight: "1.7" }}>
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
