"use client";

import { useEffect, useState } from "react";
import siteContent from "@/config/siteContent.json";
import { usePaystackPayment } from "react-paystack";
import { InlineWidget } from "react-calendly";
import FadeIn from "@/components/ui/FadeIn";

const AMOUNT_IN_KOBO = 50000 * 100;

export default function BookPage() {
  const [mounted, setMounted] = useState(false);
  const [hasPaid, setHasPaid] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [isProcessing, setIsProcessing] = useState(false);

  const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || "";
  const calendlyUrl = "https://calendly.com/beyondvaginismus/consultation";

  useEffect(() => {
    setMounted(true);
  }, []);

  const config = {
    reference: "book_" + new Date().getTime().toString(),
    email: formData.email,
    amount: AMOUNT_IN_KOBO,
    publicKey: publicKey,
    metadata: {
      custom_fields: [
        {
          display_name: "Name",
          variable_name: "name",
          value: formData.name,
        },
      ],
    },
  };

  const initializePayment = usePaystackPayment(config);

  const onSuccess = () => {
    setIsProcessing(false);
    setHasPaid(true);
  };

  const onClose = () => {
    setIsProcessing(false);
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    if (!publicKey) {
      alert("Payment gateway configuring. Please try again or contact " + siteContent.global.contactEmail);
      return;
    }
    setIsProcessing(true);
    // @ts-expect-error - react-paystack types are frequently outdated/mismatched
    initializePayment(onSuccess, onClose);
  };

  if (!mounted) return null;

  return (
    <div className="container" style={{ padding: "4rem 1.5rem 8rem", maxWidth: "900px" }}>
      <FadeIn>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <h1 className="text-gradient" style={{ fontSize: "clamp(2.4rem, 5vw, 3.5rem)", marginBottom: "1rem", fontWeight: "700" }}>
            Book Your Consultation
          </h1>
          <p style={{ fontSize: "1.1rem", color: "var(--rc-text-light)" }}>
            Schedule your secure, online 1-on-1 session with Dr. Maryam.
          </p>
        </div>
      </FadeIn>

      <FadeIn delay={0.2}>
        <div className="glass-glow" style={{ 
          display: "flex", 
          flexDirection: "column", 
          gap: "1rem", 
          marginBottom: "3rem",
          padding: "2rem",
          borderRadius: "24px",
          textAlign: "center"
        }}>
          <div style={{ fontSize: "1.5rem", fontWeight: "600", color: "var(--rc-primary-dark)" }}>
            {siteContent.global.pricing.amount} per session
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: "2rem", flexWrap: "wrap", color: "var(--rc-text-main)", fontWeight: "500" }}>
            <span>💻 Online Only</span>
            <span>⏱️ {siteContent.global.calendlySetup.durationStr}</span>
          </div>
          <p style={{ color: "var(--rc-text-main)", fontSize: "0.95rem", marginTop: "1rem" }}>
            <em>Session is confirmed only after payment.</em>
          </p>
        </div>
      </FadeIn>

      <FadeIn delay={0.4}>
        {!hasPaid ? (
          <div className="glass" style={{ 
            maxWidth: "500px", 
            margin: "0 auto", 
            padding: "3rem", 
            borderRadius: "24px",
            border: "1px solid var(--rc-border)"
          }}>
            <h3 style={{ fontSize: "1.4rem", marginBottom: "1.5rem", textAlign: "center", color: "var(--rc-text-main)" }}>
              Step 1: Payment Details
            </h3>
            <form onSubmit={handlePaymentSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <div>
                <label style={{ display: "block", marginBottom: "0.5rem", color: "var(--rc-text-main)", fontSize: "0.95rem", fontWeight: "500" }}>Full Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="Aisha Suleiman"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{ 
                    width: "100%", 
                    padding: "1rem", 
                    borderRadius: "12px", 
                    border: "1px solid var(--rc-border)",
                    backgroundColor: "rgba(255,255,255,0.7)",
                    outline: "none",
                    fontSize: "1rem"
                  }}
                />
              </div>
              <div>
                <label style={{ display: "block", marginBottom: "0.5rem", color: "var(--rc-text-main)", fontSize: "0.95rem", fontWeight: "500" }}>Email Address</label>
                <input 
                  type="email" 
                  required
                  placeholder="aisha@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  style={{ 
                    width: "100%", 
                    padding: "1rem", 
                    borderRadius: "12px", 
                    border: "1px solid var(--rc-border)",
                    backgroundColor: "rgba(255,255,255,0.7)",
                    outline: "none",
                    fontSize: "1rem"
                  }}
                />
              </div>
              <button 
                type="submit" 
                disabled={isProcessing}
                style={{ 
                  marginTop: "1rem",
                  padding: "1.2rem", 
                  borderRadius: "12px", 
                  backgroundColor: "var(--rc-primary)", 
                  color: "#fff", 
                  fontWeight: "600",
                  fontSize: "1.1rem",
                  border: "none",
                  cursor: isProcessing ? "not-allowed" : "pointer",
                  transition: "all 0.3s ease",
                  opacity: isProcessing ? 0.7 : 1,
                  boxShadow: "0 8px 20px rgba(188, 122, 143, 0.3)"
                }}
              >
                {isProcessing ? "Connecting to Paystack..." : `Pay ${siteContent.global.pricing.amount}`}
              </button>
              
              <p style={{ textAlign: "center", fontSize: "0.85rem", color: "var(--rc-text-light)", marginTop: "1rem" }}>
                Having issues? Contact <strong>{siteContent.global.contactEmail}</strong>
              </p>
            </form>
          </div>
        ) : (
          <div style={{ 
            minHeight: "700px", 
            borderRadius: "24px", 
            overflow: "hidden", 
            boxShadow: "var(--shadow-glow)",
            backgroundColor: "var(--rc-surface)",
            border: "1px solid var(--rc-border)"
          }}>
            <InlineWidget 
              url={calendlyUrl} 
              prefill={{
                name: formData.name,
                email: formData.email,
              }}
              styles={{
                height: "700px",
                width: "100%"
              }}
            />
          </div>
        )}
      </FadeIn>
    </div>
  );
}
