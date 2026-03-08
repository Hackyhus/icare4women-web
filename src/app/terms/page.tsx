import type { Metadata } from "next";
import siteContent from "@/config/siteContent.json";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms of Use and Engagement for our online consultations.",
};

export default function TermsPage() {
  return (
    <div className="container" style={{ padding: "4rem 1.5rem 8rem", maxWidth: "800px" }}>
      <h1 style={{ fontSize: "2.5rem", marginBottom: "2rem" }}>Terms of Use</h1>
      <div style={{ color: "var(--rc-text-light)", lineHeight: "1.8" }}>
        <p style={{ marginBottom: "1rem" }}>Last Updated: {new Date().toLocaleDateString()}</p>
        <h2 style={{ fontSize: "1.5rem", color: "var(--rc-text-main)", marginBottom: "1rem", marginTop: "2rem" }}>1. Online Consultation Scope</h2>
        <p style={{ marginBottom: "1rem" }}>
          {siteContent.global.projectName} provides online reproductive and gynecological advice. Our online sessions do not replace emergency medical care or in-person physical examinations. By using this service, you acknowledge the limitations of telemedicine.
        </p>
        <h2 style={{ fontSize: "1.5rem", color: "var(--rc-text-main)", marginBottom: "1rem", marginTop: "2rem" }}>2. Payments and Cancellations</h2>
        <p style={{ marginBottom: "1rem" }}>
          All sessions are priced at {siteContent.global.pricing.amount}. Bookings are only confirmed upon successful payment. We require a minimum of 24 hours notice for any rescheduling or cancellations to be eligible for review for a refund.
        </p>
        <h2 style={{ fontSize: "1.5rem", color: "var(--rc-text-main)", marginBottom: "1rem", marginTop: "2rem" }}>3. Communication Boundaries</h2>
        <p>
          Consultations are strictly appointment-based. Phone calls, Whatsapp messages, or direct texts outside of scheduled session times are not accommodated to ensure high-quality, focused care.
        </p>
      </div>
    </div>
  );
}
