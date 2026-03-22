"use client";

import React from "react";

export const Skeleton = ({ width = "100%", height = "20px", borderRadius = "8px", className = "", style = {} as React.CSSProperties }) => (
  <div 
    className={`skeleton ${className}`} 
    style={{ 
      width, 
      height, 
      borderRadius,
      background: "linear-gradient(90deg, #f0f0f0 25%, #f8f8f8 50%, #f0f0f0 75%)",
      backgroundSize: "200% 100%",
      animation: "skeleton-loading 1.5s infinite linear",
      ...style
    }} 
  />
);

export const DashboardSkeleton = () => (
  <div style={{ maxWidth: "1200px" }}>
    <div style={{ marginBottom: "3rem" }}>
      <Skeleton width="300px" height="40px" style={{ marginBottom: "1rem" }} />
      <Skeleton width="200px" height="20px" />
    </div>
    
    <div className="glass-card" style={{ padding: "3rem", borderRadius: "32px", marginBottom: "3rem" }}>
      <Skeleton width="100%" height="200px" borderRadius="16px" />
    </div>

    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
      <Skeleton width="100%" height="250px" borderRadius="24px" />
      <Skeleton width="100%" height="250px" borderRadius="24px" />
    </div>
    
    <style jsx global>{`
      @keyframes skeleton-loading {
        0% { background-position: 200% 0; }
        100% { background-position: -200% 0; }
      }
    `}</style>
  </div>
);
