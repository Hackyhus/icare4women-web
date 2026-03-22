"use client";

type StepIndicatorProps = {
  currentStep: number;
  totalSteps: number;
  steps: string[];
};

export default function StepIndicator({ currentStep, totalSteps, steps }: StepIndicatorProps) {
  return (
    <div style={{ marginBottom: "3rem", width: "100%", maxWidth: "600px", margin: "0 auto 3rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", position: "relative" }}>
        {/* Progress Line */}
        <div style={{
          position: "absolute",
          top: "20px",
          left: 0,
          right: 0,
          height: "2px",
          backgroundColor: "#f1f1f1",
          zIndex: 0
        }}>
          <div style={{
            height: "100%",
            width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%`,
            backgroundColor: "var(--rc-primary)",
            transition: "all 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)"
          }} />
        </div>

        {/* Step Circles */}
        {steps.map((step, index) => {
          const stepNum = index + 1;
          const isCompleted = currentStep > stepNum;
          const isActive = currentStep === stepNum;

          return (
            <div key={step} style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
              <div style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                backgroundColor: isCompleted || isActive ? "var(--rc-primary)" : "#fff",
                border: `2px solid ${isCompleted || isActive ? "var(--rc-primary)" : "#f1f1f1"}`,
                color: isCompleted || isActive ? "#fff" : "#999",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "600",
                fontSize: "0.9rem",
                transition: "all 0.3s ease",
                boxShadow: isActive ? "0 0 0 4px var(--rc-primary-light)" : "none"
              }}>
                {isCompleted ? "✓" : stepNum}
              </div>
              <span style={{ 
                fontSize: "0.75rem", 
                fontWeight: isActive ? "600" : "500", 
                color: isActive ? "var(--rc-primary-dark)" : "#999",
                whiteSpace: "nowrap"
              }}>
                {step}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
