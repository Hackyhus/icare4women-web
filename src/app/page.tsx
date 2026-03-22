"use client";

import Link from "next/link";
import siteContent from "@/config/siteContent.json";
import Button from "@/components/ui/Button";
import FadeIn from "@/components/ui/FadeIn";
import { ArrowRight, Sparkles } from "lucide-react";

export default function Home() {
  const { hero, howItWorks, whoItsFor } = siteContent.home;

  return (
    <div>
      {/* Hero Section */}
      <section style={{ 
        position: "relative", 
        padding: "8rem 0 6rem", 
        minHeight: "85vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden"
      }}>

        
        <FadeIn>
          <div className="container" style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
            <div style={{ 
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              backgroundColor: "var(--rc-primary-light)", 
              color: "var(--rc-primary-dark)",
              padding: "0.5rem 1.25rem",
              borderRadius: "50px",
              fontSize: "0.9rem",
              fontWeight: "600",
              marginBottom: "2rem",
              boxShadow: "var(--shadow-sm)"
            }}>
              <Sparkles size={16} />
              Expert Reproductive & Gynecological Care
            </div>
            
            <h1 
              className="text-gradient"
              style={{ 
              fontSize: "clamp(3rem, 8vw, 5.5rem)", 
              fontWeight: "700",
              marginBottom: "1.5rem",
              maxWidth: "900px",
              marginLeft: "auto",
              marginRight: "auto",
              lineHeight: 1.1,
              letterSpacing: "-0.03em"
            }}>
              {hero.headline}
            </h1>
            
            <p style={{ 
              fontSize: "clamp(1.1rem, 2vw, 1.3rem)",
              color: "var(--rc-text-light)",
              marginBottom: "2.5rem",
              maxWidth: "600px",
              marginLeft: "auto",
              marginRight: "auto",
              lineHeight: 1.6
            }}>
              {hero.subheadline}
            </p>
            
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              <Button href="/book" size="lg" showIcon>{hero.ctaText}</Button>
              <Button href="/services" variant="secondary" size="lg">Explore Services</Button>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* Areas of Focus Grid */}
      <section style={{ padding: "6rem 0", backgroundColor: "var(--rc-surface)" }}>
        <div className="container">
          <FadeIn delay={0.1}>
            <div style={{ textAlign: "center", marginBottom: "4rem" }}>
              <h2 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>Areas of Focus</h2>
              <p style={{ color: "var(--rc-text-light)" }}>Specialized attention for every stage of your journey.</p>
            </div>
          </FadeIn>
          
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", 
            gap: "2rem" 
          }}>
            {siteContent.conditions.map((condition, index) => (
              <FadeIn key={condition.id} delay={0.1 * (index + 1)}>
                <Link 
                  href={"/conditions#" + condition.id} 
                  className="hover-lift glass-glow"
                  style={{
                    padding: "2rem",
                    borderRadius: "20px",
                    textAlign: "center",
                    textDecoration: "none",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "1rem",
                    border: "1px solid var(--rc-primary-light)",
                    height: "100%"
                  }}
                >
                  <div style={{ 
                    width: "60px", height: "60px", borderRadius: "50%", 
                    backgroundColor: "var(--rc-primary-light)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "var(--rc-primary-dark)", fontSize: "1.5rem"
                  }}>
                    ✨
                  </div>
                  <h3 style={{ fontSize: "1.2rem", fontWeight: "600", color: "var(--rc-text-main)" }}>{condition.title}</h3>
                </Link>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.4}>
            <div style={{ 
              textAlign: "center", 
              marginTop: "5rem",
              padding: "3rem",
              backgroundColor: "rgba(188, 122, 147, 0.05)",
              borderRadius: "24px",
              border: "1px dashed var(--rc-primary)"
            }}>
              <h3 style={{ fontSize: "1.5rem", marginBottom: "1rem", color: "var(--rc-text-main)" }}>Specialized Vaginismus Care</h3>
              <p style={{ fontSize: "1.1rem", color: "var(--rc-text-light)", marginBottom: "1.5rem" }}>
                For concerns relating to Vaginismus or unconsummated marriages, please visit our dedicated platform:
              </p>
              <a 
                href={siteContent.global.vaginismusRedirectUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ 
                  color: "var(--rc-primary-dark)", 
                  fontWeight: "700", 
                  fontSize: "1.3rem",
                  textDecoration: "underline", 
                  display: "inline-flex", 
                  alignItems: "center", 
                  gap: "8px",
                  padding: "0.5rem 1rem",
                  backgroundColor: "#fff",
                  borderRadius: "12px",
                  boxShadow: "var(--shadow-sm)"
                }}
              >
                BeyondVaginismus.com
                <ArrowRight size={20} />
              </a>
            </div>
          </FadeIn>
        </div>
      </section>



      {/* How it works */}
      <section style={{ padding: "8rem 0", backgroundColor: "var(--rc-bg)" }}>
        <div className="container">
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: "5rem" }}>
              <h2 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>How It Works</h2>
              <p style={{ color: "var(--rc-text-light)" }}>A structured, seamless process tailored to you.</p>
            </div>
          </FadeIn>

          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", 
            gap: "3rem" 
          }}>
            {howItWorks.map((item, index) => (
              <FadeIn key={item.step} delay={0.1 * index}>
                <div style={{ textAlign: "center", padding: "1rem" }}>
                  <div style={{
                    width: "60px", height: "60px", borderRadius: "50%",
                    backgroundColor: "var(--rc-primary)", color: "#fff",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "1.5rem", fontWeight: "bold", margin: "0 auto 1.5rem",
                    boxShadow: "var(--shadow-md)"
                  }}>
                    {item.step}
                  </div>
                  <h3 style={{ fontSize: "1.35rem", marginBottom: "1rem", color: "var(--rc-text-main)" }}>{item.title}</h3>
                  <p style={{ color: "var(--rc-text-light)", fontSize: "1rem", lineHeight: 1.6 }}>{item.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Meet Your Doctor */}
      <section style={{ padding: "6rem 0", backgroundColor: "var(--rc-surface)" }}>
        <div className="container">
          <FadeIn>
            <div className="doctor-split" style={{
              display: "grid",
              gap: "0",
              borderRadius: "32px",
              overflow: "hidden",
              border: "1px solid var(--rc-border)",
              minHeight: "450px"
            }}>
              {/* Photo Side */}
              <div style={{
                position: "relative",
                minHeight: "400px"
              }}>
                <img
                  src="/images/dr-maryam-working.jpg"
                  alt="Dr. Maryam providing telehealth consultation"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center 25%",
                    display: "block"
                  }}
                />
                {/* Subtle dark overlay to blend with UI */}
                <div style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(135deg, rgba(45, 25, 35, 0.15) 0%, rgba(45, 25, 35, 0.3) 100%)",
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
                  Meet Your Doctor
                </p>
                <h2 style={{
                  fontSize: "2rem",
                  fontWeight: "800",
                  marginBottom: "1rem",
                  lineHeight: 1.2
                }}>
                  Dr. Maryam
                </h2>
                <p style={{
                  color: "var(--rc-text-light)",
                  lineHeight: 1.7,
                  marginBottom: "1.5rem",
                  fontSize: "1.05rem"
                }}>
                  A specialist in reproductive endocrinology, fertility strategies, and menstrual disorders — dedicated to providing private, structured, and expert gynecological care online.
                </p>
                <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                  <Button href="/about" variant="secondary" size="md">Learn More</Button>
                  <Button href="/book" size="md" showIcon>Book a Session</Button>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>

        <style jsx>{`
          .doctor-split {
            grid-template-columns: 1fr 1fr;
          }
          @media (max-width: 768px) {
            .doctor-split {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>
      </section>

      {/* Who it's for & Final CTA */}
      <section style={{ 
        padding: "8rem 0", 
        backgroundColor: "var(--rc-primary-light)",
        color: "var(--rc-text-main)",
        textAlign: "center"
      }}>
        <div className="container" style={{ maxWidth: "800px" }}>
          <FadeIn>
            <h2 style={{ fontSize: "2.5rem", marginBottom: "2rem", color: "var(--rc-text-main)" }}>Who is this for?</h2>
            <p style={{ fontSize: "1.2rem", marginBottom: "4rem", opacity: 0.95, lineHeight: 1.8 }}>
              {whoItsFor}
            </p>
          </FadeIn>
          
          <FadeIn delay={0.2}>
            <div className="glass-glow hover-lift" style={{ padding: "4rem", borderRadius: "32px" }}>
              <h3 style={{ fontSize: "2rem", marginBottom: "1.5rem", color: "var(--rc-text-main)" }}>Ready to take control of your health?</h3>
              <Button href="/book" size="lg" showIcon>
                Book Your Consultation Now
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
