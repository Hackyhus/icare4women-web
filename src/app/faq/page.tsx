import Accordion from "@/components/ui/Accordion";
import Button from "@/components/ui/Button";
import FadeIn from "@/components/ui/FadeIn";
import siteContent from "@/config/siteContent.json";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description: "Find answers to the most common questions about booking an online consultation with Dr. Maryam.",
};

export default function FAQPage() {
  const { faqs } = siteContent;

  return (
    <div className="container" style={{ padding: "4rem 1.5rem 8rem", maxWidth: "800px" }}>
      <FadeIn>
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <h1 className="text-gradient" style={{ fontSize: "clamp(2.5rem, 5vw, 3.5rem)", marginBottom: "1rem", fontWeight: "700" }}>Frequently Asked Questions</h1>
          <p style={{ fontSize: "1.1rem", color: "var(--rc-text-light)" }}>
            Everything you need to know about how {siteContent.global.projectName} works.
          </p>
        </div>
      </FadeIn>

      <FadeIn delay={0.2}>
        <div className="glass-glow" style={{
          padding: "2rem 3rem",
          borderRadius: "24px",
        }}>
          {faqs.map((faq, index) => (
             <Accordion key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </FadeIn>
      
      <FadeIn delay={0.4}>
        <div style={{ textAlign: "center", marginTop: "4rem" }}>
          <p style={{ color: "var(--rc-text-light)", marginBottom: "1.5rem" }}>
            Still have questions? The best way to get personalized advice is to book a session.
          </p>
          <Button href="/book" size="lg" showIcon>
            Book Consultation
          </Button>
        </div>
      </FadeIn>
    </div>
  );
}
