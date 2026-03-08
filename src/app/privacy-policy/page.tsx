import type { Metadata } from "next";
import siteContent from "@/config/siteContent.json";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for our online consultations.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="container" style={{ padding: "4rem 1.5rem 8rem", maxWidth: "800px" }}>
      <h1 style={{ fontSize: "2.5rem", marginBottom: "2rem" }}>Privacy Policy</h1>
      <div style={{ color: "var(--rc-text-light)", lineHeight: "1.8" }}>
        <p style={{ marginBottom: "1rem" }}>Last Updated: {new Date().toLocaleDateString()}</p>
        <h2 style={{ fontSize: "1.5rem", color: "var(--rc-text-main)", marginBottom: "1rem", marginTop: "2rem" }}>1. Introduction</h2>
        <p style={{ marginBottom: "1rem" }}>
          Welcome to {siteContent.global.projectName}. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website.
        </p>
        <h2 style={{ fontSize: "1.5rem", color: "var(--rc-text-main)", marginBottom: "1rem", marginTop: "2rem" }}>2. The Data We Collect</h2>
        <p style={{ marginBottom: "1rem" }}>
          We may collect, use, store and transfer different kinds of personal data about you during the booking process via Calendly, including Identity Data and Contact Data. We explicitly do not store your medical records directly on this frontend website infrastructure.
        </p>
        <h2 style={{ fontSize: "1.5rem", color: "var(--rc-text-main)", marginBottom: "1rem", marginTop: "2rem" }}>3. Data Security</h2>
        <p>
          We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorised way, altered or disclosed. Video consultations are fully end-to-end encrypted.
        </p>
      </div>
    </div>
  );
}
