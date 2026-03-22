"use client";

import PartogramManager from "@/components/doctor/PartogramManager";
import FadeIn from "@/components/ui/FadeIn";

export default function NewPartogramPage() {
  return (
    <div style={{ maxWidth: "1200px" }}>
      <FadeIn>
        <div style={{ marginBottom: "2.5rem" }}>
          <h1 style={{ fontSize: "2.2rem", fontWeight: "700", marginBottom: "0.5rem" }}>
            Labor Monitoring
          </h1>
          <p style={{ color: "var(--rc-text-light)" }}>
            Tracking labor progress for <strong>Patient: Sarah Johnson</strong>
          </p>
        </div>
      </FadeIn>

      <PartogramManager />
    </div>
  );
}
