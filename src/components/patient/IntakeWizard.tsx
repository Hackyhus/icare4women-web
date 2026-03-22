"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, CheckCircle2, Info, Heart, ClipboardList, MapPin } from "lucide-react";

interface IntakeWizardProps {
  onComplete: (data: Record<string, string>) => Promise<void>;
  isSubmitting: boolean;
}

export default function IntakeWizard({ onComplete, isSubmitting }: IntakeWizardProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    age: "",
    dob: "",
    phone: "",
    location: "",
    maritalStatus: "Single",
    medicalHistory: "",
    reason: ""
  });

  const totalSteps = 4;

  const nextStep = () => setStep((s) => Math.min(s + 1, totalSteps));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));



  const steps = [
    { title: "Personal Details", icon: <Heart size={20} /> },
    { title: "Location & Contact", icon: <MapPin size={20} /> },
    { title: "Medical History", icon: <ClipboardList size={20} /> },
    { title: "Consultation Reason", icon: <Info size={20} /> }
  ];

  const handleFinish = () => {
    onComplete(formData);
  };

  return (
    <div style={{ maxWidth: "700px", margin: "0 auto" }}>
      {/* Step Indicator */}
      <div style={{ marginBottom: "3rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem", position: "relative" }}>
           {steps.map((s, i) => (
             <div key={i} style={{ 
               display: "flex", 
               flexDirection: "column", 
               alignItems: "center", 
               zIndex: 2,
               flex: 1
             }}>
               <div style={{ 
                 width: "40px", 
                 height: "40px", 
                 borderRadius: "12px", 
                 backgroundColor: step >= i + 1 ? "var(--rc-primary)" : "var(--rc-secondary-light)",
                 color: step >= i + 1 ? "white" : "var(--rc-text-light)",
                 display: "flex",
                 alignItems: "center",
                 justifyContent: "center",
                 transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                 boxShadow: step >= i + 1 ? "var(--shadow-glow)" : "none",
                 marginBottom: "0.5rem"
               }}>
                 {step > i + 1 ? <CheckCircle2 size={24} /> : s.icon}
               </div>
               <span style={{ 
                 fontSize: "0.75rem", 
                 fontWeight: "600", 
                 color: step >= i + 1 ? "var(--rc-primary-dark)" : "var(--rc-text-light)",
                 textAlign: "center"
               }}>{s.title}</span>
             </div>
           ))}
           
           {/* Progress Line */}
           <div style={{ 
             position: "absolute", 
             top: "20px", 
             left: "12.5%", 
             right: "12.5%", 
             height: "2px", 
             backgroundColor: "var(--rc-secondary-light)", 
             zIndex: 1 
           }}>
             <motion.div 
               initial={{ width: 0 }}
               animate={{ width: `${((step - 1) / (totalSteps - 1)) * 100}%` }}
               style={{ height: "100%", backgroundColor: "var(--rc-primary)" }}
             />
           </div>
        </div>
      </div>

      <div className="glass-card" style={{ padding: "3rem", borderRadius: "32px", minHeight: "450px", display: "flex", flexDirection: "column" }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            style={{ flex: 1 }}
          >
            {step === 1 && (
              <div style={{ display: "grid", gap: "2rem" }}>
                <div>
                  <h2 style={{ marginBottom: "0.5rem" }}>The Basics</h2>
                  <p style={{ color: "var(--rc-text-light)", marginBottom: "2rem" }}>Let&apos;s start with your personal details.</p>
                  
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
                    <div>
                      <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600" }}>Your Age</label>
                      <input 
                        type="text" required placeholder="e.g. 32" value={formData.age}
                        onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                        style={{ width: "100%", padding: "1.1rem", borderRadius: "14px", border: "1px solid var(--rc-border)", fontSize: "1rem", outline: "none" }}
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600" }}>Date of Birth</label>
                      <input 
                        type="date" required value={formData.dob}
                        onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                        style={{ width: "100%", padding: "1.1rem", borderRadius: "14px", border: "1px solid var(--rc-border)", fontSize: "1rem", outline: "none" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div style={{ display: "grid", gap: "2rem" }}>
                <div>
                  <h2 style={{ marginBottom: "0.5rem" }}>Stay Connected</h2>
                  <p style={{ color: "var(--rc-text-light)", marginBottom: "2rem" }}>How can we reach you and where are you located?</p>
                  
                  <div style={{ display: "grid", gap: "1.5rem" }}>
                    <div>
                      <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600" }}>Phone Number</label>
                      <input 
                        type="tel" required placeholder="+234..." value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        style={{ width: "100%", padding: "1.1rem", borderRadius: "14px", border: "1px solid var(--rc-border)", fontSize: "1rem", outline: "none" }}
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600" }}>Location</label>
                      <input 
                        type="text" required placeholder="City, Country" value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        style={{ width: "100%", padding: "1.1rem", borderRadius: "14px", border: "1px solid var(--rc-border)", fontSize: "1rem", outline: "none" }}
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600" }}>Marital Status</label>
                      <select 
                        value={formData.maritalStatus}
                        onChange={(e) => setFormData({ ...formData, maritalStatus: e.target.value })}
                        style={{ width: "100%", padding: "1.1rem", borderRadius: "14px", border: "1px solid var(--rc-border)", fontSize: "1rem", backgroundColor: "white", outline: "none" }}
                      >
                        <option>Single</option>
                        <option>Married</option>
                        <option>Divorced</option>
                        <option>Widowed</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div style={{ display: "grid", gap: "2rem" }}>
                <div>
                  <h2 style={{ marginBottom: "0.5rem" }}>Medical History</h2>
                  <p style={{ color: "var(--rc-text-light)", marginBottom: "2rem" }}>A brief overview of your gynecological health.</p>
                  
                  <textarea 
                    placeholder="Previous surgeries, hormonal issues, family history..." value={formData.medicalHistory}
                    onChange={(e) => setFormData({ ...formData, medicalHistory: e.target.value })}
                    style={{ width: "100%", padding: "1.1rem", borderRadius: "14px", border: "1px solid var(--rc-border)", fontSize: "1rem", minHeight: "200px", outline: "none", resize: "none" }}
                  />
                </div>
              </div>
            )}

            {step === 4 && (
              <div style={{ display: "grid", gap: "2rem" }}>
                <div>
                  <h2 style={{ marginBottom: "0.5rem" }}>Final Step</h2>
                  <p style={{ color: "var(--rc-text-light)", marginBottom: "2rem" }}>What is the primary reason for your visit today?</p>
                  
                  <textarea 
                    placeholder="Describe your primary concerns..." value={formData.reason}
                    onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                    style={{ width: "100%", padding: "1.1rem", borderRadius: "14px", border: "1px solid var(--rc-border)", fontSize: "1rem", minHeight: "150px", outline: "none", resize: "none" }}
                  />

                  <div style={{ marginTop: "2rem", padding: "1.5rem", backgroundColor: "rgba(188, 122, 147, 0.05)", borderRadius: "16px", display: "flex", gap: "10px", alignItems: "center" }}>
                    <CheckCircle2 size={24} color="var(--rc-primary)" />
                    <p style={{ fontSize: "0.9rem", color: "var(--rc-primary-dark)", fontWeight: "600" }}>All set! Click finish to complete your clinical registration.</p>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "3rem", gap: "1rem" }}>
          {step > 1 ? (
            <button onClick={prevStep} className="btn-secondary" style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
              <ChevronLeft size={20} /> Previous
            </button>
          ) : <div style={{ flex: 1 }} />}
          
          {step < totalSteps ? (
            <button onClick={nextStep} className="btn-primary" style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
              Continue <ChevronRight size={20} />
            </button>
          ) : (
            <button onClick={handleFinish} disabled={isSubmitting} className="btn-primary" style={{ flex: 1 }}>
              {isSubmitting ? "Finalizing..." : "Finish Registration"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
