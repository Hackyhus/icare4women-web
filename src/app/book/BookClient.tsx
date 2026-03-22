"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import siteContent from "@/config/siteContent.json";
import { usePaystackPayment } from "react-paystack";
import { InlineWidget } from "react-calendly";
import FadeIn from "@/components/ui/FadeIn";
import StepIndicator from "@/components/ui/StepIndicator";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

function BookContent() {
  const searchParams = useSearchParams();
  const initialServiceId = searchParams.get("service");
  
  const [mounted, setMounted] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedServiceId, setSelectedServiceId] = useState(initialServiceId || siteContent.services[0].id);
  const [hasPaid, setHasPaid] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [isProcessing, setIsProcessing] = useState(false);

  const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || "";
  const calendlyUrl = "https://calendly.com/beyondvaginismus/consultation";

  const selectedService = siteContent.services.find(s => s.id === selectedServiceId) || siteContent.services[0];
  const AMOUNT_IN_KOBO = selectedService.price * 100;

  useEffect(() => {
    setMounted(true);
    if (initialServiceId) {
      setSelectedServiceId(initialServiceId);
      // If we land with a service ID, we still start at Step 1 but it's pre-selected.
      // Or we could jump to Step 2 if the user came from the services page.
      // Let's jump to Step 2 if they specifically clicked "Book" on a service.
      setCurrentStep(2);
    }
  }, [initialServiceId]);

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
        {
          display_name: "Service",
          variable_name: "service",
          value: selectedService.title,
        },
      ],
    },
  };

  const initializePayment = usePaystackPayment(config);

  const onSuccess = async (reference: any) => {
    setIsProcessing(false);
    
    // Log to Firestore
    try {
      await addDoc(collection(db, "transactions"), {
        reference: reference.reference,
        status: "success",
        amount: selectedService.price,
        patientEmail: formData.email,
        patientName: formData.name,
        serviceId: selectedServiceId,
        createdAt: new Date().toISOString()
      });
    } catch (e) {
      console.error("Failed to log transaction:", e);
    }
    
    setHasPaid(true);
    setCurrentStep(3);
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

  const steps = ["Select Service", "Payment & Details", "Schedule"];

  return (
    <div className="container" style={{ padding: "4rem 1.5rem 8rem", maxWidth: "1000px" }}>
      <FadeIn>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <h1 className="text-gradient" style={{ fontSize: "clamp(2.4rem, 5vw, 3.5rem)", marginBottom: "1rem", fontWeight: "700" }}>
            Book Your Consultation
          </h1>
          <p style={{ fontSize: "1.1rem", color: "var(--rc-text-light)" }}>
            A seamless path to specialized care.
          </p>
        </div>
      </FadeIn>

      <StepIndicator currentStep={currentStep} totalSteps={3} steps={steps} />

      <div style={{ position: "relative", minHeight: "400px" }}>
        <AnimatePresence mode="wait">
          {/* STEP 1: SERVICE SELECTION */}
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
            >
              <div style={{ 
                display: "grid", 
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", 
                gap: "1.5rem",
                marginTop: "2rem" 
              }}>
                {siteContent.services.map((service) => (
                  <div 
                    key={service.id}
                    onClick={() => {
                      setSelectedServiceId(service.id);
                      setCurrentStep(2);
                    }}
                    className="glass-glow hover-lift"
                    style={{
                      padding: "2rem",
                      borderRadius: "24px",
                      cursor: "pointer",
                      border: selectedServiceId === service.id ? "2px solid var(--rc-primary)" : "1px solid var(--rc-border)",
                      backgroundColor: selectedServiceId === service.id ? "rgba(188, 122, 147, 0.05)" : "var(--rc-glass-bg)",
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.5rem"
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <h3 style={{ fontSize: "1.25rem", color: "var(--rc-text-main)", fontWeight: "600" }}>{service.title}</h3>
                      {selectedServiceId === service.id && <Check size={20} color="var(--rc-primary)" />}
                    </div>
                    <p style={{ fontSize: "0.9rem", color: "var(--rc-text-light)", marginBottom: "1rem" }}>{service.whoItsFor}</p>
                    <div style={{ marginTop: "auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontWeight: "700", color: "var(--rc-primary-dark)", fontSize: "1.2rem" }}>{service.priceStr}</span>
                      <span style={{ fontSize: "0.85rem", color: "var(--rc-text-light)" }}>45 mins</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 2: PAYMENT & DETAILS */}
          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              style={{ maxWidth: "500px", margin: "0 auto" }}
            >
              <div className="glass" style={{ 
                padding: "3rem", 
                borderRadius: "32px", 
                border: "1px solid var(--rc-border)",
                boxShadow: "var(--shadow-lg)"
              }}>
                <button 
                  onClick={() => setCurrentStep(1)}
                  style={{ background: "none", border: "none", color: "var(--rc-primary-dark)", cursor: "pointer", fontWeight: "600", marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "5px" }}
                >
                  ← Back to Services
                </button>
                
                <div style={{ marginBottom: "2rem", padding: "1.5rem", backgroundColor: "var(--rc-primary-light)", borderRadius: "16px", border: "1px solid var(--rc-primary-light)" }}>
                   <p style={{ fontSize: "0.85rem", color: "var(--rc-primary-dark)", fontWeight: "600", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "0.5rem" }}>Selected Service</p>
                   <p style={{ fontSize: "1.1rem", fontWeight: "700", color: "var(--rc-text-main)" }}>{selectedService.title}</p>
                   <p style={{ fontSize: "1.3rem", fontWeight: "800", color: "var(--rc-primary-dark)", marginTop: "0.5rem" }}>{selectedService.priceStr}</p>
                </div>

                <form onSubmit={handlePaymentSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                  <div>
                    <label style={{ display: "block", marginBottom: "0.5rem", color: "var(--rc-text-main)", fontSize: "0.95rem", fontWeight: "600" }}>Full Name</label>
                    <input 
                      type="text" required placeholder="Aisha Suleiman" value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      style={{ width: "100%", padding: "1.1rem", borderRadius: "14px", border: "1px solid var(--rc-border)", backgroundColor: "rgba(255,255,255,0.95)", outline: "none", fontSize: "1rem" }}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", marginBottom: "0.5rem", color: "var(--rc-text-main)", fontSize: "0.95rem", fontWeight: "600" }}>Email Address</label>
                    <input 
                      type="email" required placeholder="aisha@example.com" value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      style={{ width: "100%", padding: "1.1rem", borderRadius: "14px", border: "1px solid var(--rc-border)", backgroundColor: "rgba(255,255,255,0.95)", outline: "none", fontSize: "1rem" }}
                    />
                  </div>
                  <button 
                    type="submit" disabled={isProcessing}
                    style={{ 
                      marginTop: "1rem", padding: "1.3rem", borderRadius: "14px", backgroundColor: "var(--rc-primary)", color: "#fff", fontWeight: "700", fontSize: "1.1rem", border: "none", cursor: isProcessing ? "not-allowed" : "pointer", transition: "all 0.3s ease",
                      boxShadow: "0 10px 25px rgba(188, 122, 147, 0.4)"
                    }}
                  >
                    {isProcessing ? "Connecting to Paystack..." : `Pay ${selectedService.priceStr}`}
                  </button>
                  <p style={{ textAlign: "center", fontSize: "0.8rem", color: "var(--rc-text-light)", display: "flex", alignItems: "center", justifyContent: "center", gap: "5px" }}>
                    🔒 <strong>Secure Payment</strong> via Paystack
                  </p>
                </form>
              </div>
            </motion.div>
          )}

          {/* STEP 3: SCHEDULING */}
          {currentStep === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div style={{ textAlign: "center", marginBottom: "3rem" }}>
                 <div style={{ width: "80px", height: "80px", borderRadius: "50%", backgroundColor: "#4BB543", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem", boxShadow: "0 4px 15px rgba(75, 181, 67, 0.3)" }}>
                    <Check size={40} strokeWidth={3} />
                 </div>
                 <h2 style={{ fontSize: "2rem", color: "var(--rc-text-main)", fontWeight: "700" }}>Payment Successful!</h2>
                 <p style={{ color: "var(--rc-text-light)", marginTop: "0.5rem", fontSize: "1.1rem" }}>Please choose your consultation time below.</p>
              </div>

              <div style={{ 
                minHeight: "700px", borderRadius: "32px", overflow: "hidden", 
                boxShadow: "var(--shadow-glow)", backgroundColor: "var(--rc-surface)", border: "1px solid var(--rc-border)",
                marginBottom: "3rem"
              }}>
                <InlineWidget 
                  url={calendlyUrl} 
                  prefill={{ name: formData.name, email: formData.email }}
                  styles={{ height: "700px", width: "100%" }}
                />
              </div>

              <div className="glass-glow" style={{ padding: "3rem", borderRadius: "32px", textAlign: "center", border: "2px solid var(--rc-primary-light)" }}>
                <h3 style={{ fontSize: "1.5rem", fontWeight: "700", marginBottom: "1rem" }}>One Last Step!</h3>
                <p style={{ color: "var(--rc-text-light)", marginBottom: "2rem", fontSize: "1.1rem" }}>
                  Please complete your clinical intake form so Dr. Maryam can review your medical history before the consultation.
                </p>
                <Link 
                  href="/profile/complete" 
                  style={{ 
                    padding: "1.2rem 2.5rem", borderRadius: "16px", backgroundColor: "var(--rc-primary-dark)", color: "white", fontWeight: "700", textDecoration: "none", fontSize: "1.1rem", display: "inline-flex", alignItems: "center", gap: "10px" 
                  }}
                >
                  Complete Clinical Profile <ArrowRight size={20} />
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// Main page component with Suspense boundary for useSearchParams
export default function BookPage() {
  return (
    <Suspense fallback={<div className="container" style={{ padding: "8rem 0", textAlign: "center" }}>Loading booking details...</div>}>
      <BookContent />
    </Suspense>
  );
}
