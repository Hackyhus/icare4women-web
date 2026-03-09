import siteContent from "@/config/siteContent.json";
import ServiceCard from "@/components/ui/ServiceCard";
import Button from "@/components/ui/Button";
import FadeIn from "@/components/ui/FadeIn";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services & Pricing",
  description: "Explore our specialized online reproductive and gynecological consultation services.",
};

export default function ServicesPage() {
  return (
    <div className="container" style={{ padding: "4rem 1.5rem 8rem" }}>
      <FadeIn>
        <div style={{ textAlign: "center", marginBottom: "4rem", maxWidth: "800px", margin: "0 auto 4rem" }}>
          <div style={{ 
            display: "inline-block", 
            backgroundColor: "var(--rc-primary-light)", 
            color: "var(--rc-primary-dark)",
            padding: "0.4rem 1rem",
            borderRadius: "50px",
            fontSize: "0.85rem",
            fontWeight: "600",
            marginBottom: "1rem",
          }}>
            Online Consultations
          </div>
          <h1 className="text-gradient" style={{ fontSize: "clamp(2.5rem, 5vw, 3.5rem)", marginBottom: "1rem", fontWeight: "700" }}>Services & Pricing</h1>
          <p style={{ fontSize: "1.1rem", color: "var(--rc-text-light)" }}>
            Clear, upfront pricing with no hidden fees. All our specialized sessions are conducted securely online for your privacy and convenience.
          </p>
        </div>
      </FadeIn>

      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", 
        gap: "2rem" 
      }}>
        {siteContent.services.map((service, index) => (
           <FadeIn key={service.id} delay={index * 0.1}>
             <ServiceCard
               title={service.title}
               whoItsFor={service.whoItsFor}
               includes={service.includes}
               priceStr={siteContent.global.pricing.amount}
               durationStr={siteContent.global.calendlySetup.durationStr}
               ctaLink={"/book?service=" + service.id}
             />
           </FadeIn>
        ))}
      </div>

      <FadeIn delay={0.3}>
        <div className="glass" style={{ 
          marginTop: "4rem", 
          padding: "3rem", 
          borderRadius: "24px",
          display: "flex",
          flexWrap: "wrap",
          gap: "3rem",
          alignItems: "center"
        }}>
          <div style={{ flex: "1 1 auto", textAlign: "center" }}>
            <h3 className="text-gradient" style={{ fontSize: "2rem", marginBottom: "1rem" }}>Need something else?</h3>
            <p style={{ color: "var(--rc-text-light)", marginBottom: "2rem", fontSize: "1.1rem", lineHeight: "1.8", maxWidth: "600px", margin: "0 auto 2rem" }}>
              If you are unsure which option is right for you, book the <strong>Reproductive Health Consultation</strong>. Dr. Maryam will guide you.
            </p>
            <Button href="/book" showIcon>Book Consultation</Button>
          </div>
        </div>
      </FadeIn>
    </div>
  );
}
