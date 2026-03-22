"use client";

import PrescriptionCreator from "@/components/doctor/PrescriptionCreator";
import FadeIn from "@/components/ui/FadeIn";

export default function NewPrescriptionPage() {
  return (
    <div style={{ maxWidth: "1200px" }}>
      <FadeIn>
        <div style={{ marginBottom: "2.5rem" }}>
          <h1 style={{ fontSize: "2.2rem", fontWeight: "700", marginBottom: "0.5rem" }}>
            Create Prescription
          </h1>
          <p style={{ color: "var(--rc-text-light)" }}>
            Generate a secure medical order for your patient.
          </p>
        </div>
      </FadeIn>

      <PrescriptionCreator />
    </div>
  );
}
