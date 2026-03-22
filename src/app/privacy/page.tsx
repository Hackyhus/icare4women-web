"use client";

import FadeIn from "@/components/ui/FadeIn";

export default function PrivacyPage() {
  return (
    <div className="container" style={{ padding: "6rem 1.5rem 8rem", maxWidth: "800px" }}>
      <FadeIn>
        <h1 className="text-gradient" style={{ fontSize: "3rem", fontWeight: "800", marginBottom: "2rem" }}>Privacy Policy</h1>
        <div style={{ color: "var(--rc-text-main)", lineHeight: 1.8, fontSize: "1.1rem" }}>
          <p style={{ marginBottom: "1.5rem" }}>
            At <strong>iCare4Women</strong>, your privacy and health data security are our highest priorities. 
            This policy outlines how we handle your personal and clinical information.
          </p>
          
          <h2 style={{ fontSize: "1.5rem", fontWeight: "700", marginTop: "2rem", marginBottom: "1rem" }}>1. Data Collection</h2>
          <p style={{ marginBottom: "1.5rem" }}>
            We collect personal information (name, email) for booking and clinical information provided through our intake forms 
            to ensure Dr. Maryam can provide the best possible care.
          </p>

          <h2 style={{ fontSize: "1.5rem", fontWeight: "700", marginTop: "2rem", marginBottom: "1rem" }}>2. Medical Confidentiality</h2>
          <p style={{ marginBottom: "1.5rem" }}>
            All clinical data is stored securely using industry-standard encryption. Access is strictly limited to 
            authorized clinical staff (Dr. Maryam) for the purpose of your consultation.
          </p>

          <h2 style={{ fontSize: "1.5rem", fontWeight: "700", marginTop: "2rem", marginBottom: "1rem" }}>3. Data Sharing</h2>
          <p style={{ marginBottom: "1.5rem" }}>
            We do not sell or share your data with third parties for marketing purposes. Data is only shared with 
            integrated services (like Paystack for payments) necessary to fulfill your request.
          </p>
          
          <p style={{ marginTop: "4rem", fontSize: "0.9rem", color: "var(--rc-text-light)" }}>
            Last updated: March 19, 2026
          </p>
        </div>
      </FadeIn>
    </div>
  );
}
