"use client";

import FadeIn from "@/components/ui/FadeIn";

export default function TermsPage() {
  return (
    <div className="container" style={{ padding: "6rem 1.5rem 8rem", maxWidth: "800px" }}>
      <FadeIn>
        <h1 className="text-gradient" style={{ fontSize: "3rem", fontWeight: "800", marginBottom: "2rem" }}>Terms of Service</h1>
        <div style={{ color: "var(--rc-text-main)", lineHeight: 1.8, fontSize: "1.1rem" }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: "700", marginTop: "2rem", marginBottom: "1rem" }}>1. Telehealth Consultations</h2>
          <p style={{ marginBottom: "1.5rem" }}>
            iCare4Women provides online gynecological and reproductive health guidance. These consultations 
            are not a substitute for emergency medical care. If you are experiencing a medical emergency, 
            please visit the nearest hospital immediately.
          </p>

          <h2 style={{ fontSize: "1.5rem", fontWeight: "700", marginTop: "2rem", marginBottom: "1rem" }}>2. Payment & Refunds</h2>
          <p style={{ marginBottom: "1.5rem" }}>
            Payments are required in advance to secure your consultation slot. Cancellations made 24 hours 
            prior to the appointment are eligible for a full refund or free rescheduling.
          </p>

          <h2 style={{ fontSize: "1.5rem", fontWeight: "700", marginTop: "2rem", marginBottom: "1rem" }}>3. Limitations of Liability</h2>
          <p style={{ marginBottom: "1.5rem" }}>
            While we strive for excellence, iCare4Women and Dr. Maryam are not liable for outcomes 
            resulting from incomplete or inaccurate information provided by the patient.
          </p>
          
          <p style={{ marginTop: "4rem", fontSize: "0.9rem", color: "var(--rc-text-light)" }}>
            Last updated: March 19, 2026
          </p>
        </div>
      </FadeIn>
    </div>
  );
}
