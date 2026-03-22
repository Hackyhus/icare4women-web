"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/lib/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import FadeIn from "@/components/ui/FadeIn";


import IntakeWizard from "@/components/patient/IntakeWizard";

export default function CompleteProfilePage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login?redirect=/profile/complete");
    }
  }, [user, loading, router]);

  const handleComplete = async (formData: Record<string, string>) => {
    if (!user) return;
    setIsSubmitting(true);

    try {
      await updateDoc(doc(db, "users", user.uid), {
        ...formData,
        profileCompleted: true,
        updatedAt: new Date().toISOString()
      });
      router.push("/profile");
    } catch (error) {
      console.error("Profile update error:", error);
      alert("Failed to save profile. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading || !user) return <div style={{ textAlign: "center", padding: "10rem" }}>Loading...</div>;

  return (
    <div className="container" style={{ padding: "4rem 1.5rem 8rem", maxWidth: "900px" }}>
      <FadeIn>
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <h1 className="text-gradient" style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)", fontWeight: "800", marginBottom: "1rem" }}>Clinical Onboarding</h1>
          <p style={{ color: "var(--rc-text-light)", fontSize: "1.1rem" }}>Welcome to iCare4Women. Let&apos;s get to know you better.</p>
        </div>

        <IntakeWizard onComplete={handleComplete} isSubmitting={isSubmitting} />
      </FadeIn>
    </div>
  );
}
