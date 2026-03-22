"use client";

import LabRequestCreator from "@/components/doctor/LabRequestCreator";
import FadeIn from "@/components/ui/FadeIn";

export default function NewLabRequestPage() {
  return (
    <div style={{ maxWidth: "1200px" }}>
      <FadeIn>
        <div style={{ marginBottom: "2.5rem" }}>
          <h1 style={{ fontSize: "2.2rem", fontWeight: "700", marginBottom: "0.5rem" }}>
            Laboratory Requisition
          </h1>
          <p style={{ color: "var(--rc-text-light)" }}>
            Request diagnostic tests and scans for your patient.
          </p>
        </div>
      </FadeIn>

      <LabRequestCreator />
    </div>
  );
}
