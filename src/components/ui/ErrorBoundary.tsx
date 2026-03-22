"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import FadeIn from "./FadeIn";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import Link from "next/link";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div style={{ 
          minHeight: "100vh", 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "center",
          padding: "2rem",
          backgroundColor: "var(--rc-bg)"
        }}>
          <FadeIn>
            <div className="glass-card" style={{ 
              maxWidth: "500px", 
              padding: "3rem", 
              borderRadius: "32px", 
              textAlign: "center",
              border: "2px solid var(--rc-primary-light)"
            }}>
              <div style={{ 
                width: "80px", 
                height: "80px", 
                borderRadius: "50%", 
                backgroundColor: "rgba(231, 76, 60, 0.1)", 
                color: "#e74c3c",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 2rem"
              }}>
                <AlertTriangle size={40} />
              </div>
              
              <h1 className="text-gradient" style={{ fontSize: "2rem", fontWeight: "800", marginBottom: "1rem" }}>
                Something went wrong
              </h1>
              <p style={{ color: "var(--rc-text-light)", marginBottom: "2.5rem", lineHeight: 1.6 }}>
                An unexpected error occurred. Don&apos;t worry, your data is safe. Please try refreshing the page.
              </p>

              <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
                <button 
                  onClick={() => window.location.reload()}
                  className="btn-primary" 
                  style={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <RefreshCw size={18} /> Refresh Page
                </button>
                <Link href="/" className="btn-secondary" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <Home size={18} /> Go Home
                </Link>
              </div>
              
              {process.env.NODE_ENV === "development" && (
                <pre style={{ 
                  marginTop: "2rem", 
                  padding: "1rem", 
                  backgroundColor: "#f8f9fa", 
                  borderRadius: "12px", 
                  fontSize: "0.8rem", 
                  textAlign: "left",
                  overflowX: "auto",
                  color: "#e74c3c"
                }}>
                  {this.state.error?.toString()}
                </pre>
              )}
            </div>
          </FadeIn>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
