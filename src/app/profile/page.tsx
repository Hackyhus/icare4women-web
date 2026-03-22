"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import Link from "next/link";
import FadeIn from "@/components/ui/FadeIn";
import FileUpload from "@/components/patient/FileUpload";
import { DashboardSkeleton } from "@/components/ui/Skeleton";
import { Info, FileText, MessageSquare, ChevronRight } from "lucide-react";

interface Appointment {
  id: string;
  type: string;
  date: string;
  time: string;
  zoomLink?: string;
  patientId?: string;
}

export default function ProfilePage() {
  const { user, userData, loading, logout } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    if (!user) return;

    const fetchAppointments = async () => {
      try {
        const q = query(
          collection(db, "appointments"),
          where("patientId", "==", user.uid),
          orderBy("date", "desc")
        );
        const snapshot = await getDocs(q);
        const apts = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Appointment[];
        setAppointments(apts);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchAppointments();
  }, [user]);

  if (loading || !user) {
    return (
      <div className="container" style={{ padding: "4rem 1.5rem 8rem" }}>
        <DashboardSkeleton />
      </div>
    );
  }

  const nextApt = appointments[0];

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", paddingBottom: "8rem" }}>
      <FadeIn>
        {/* Patient Hero Section */}
        <div className="bg-glow" style={{ padding: "4rem 0", marginBottom: "3rem", position: "relative" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "2rem" }}>
            <div>
              <h1 className="text-gradient" style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)", fontWeight: "800", marginBottom: "0.5rem" }}>
                Welcome, {userData?.name?.split(' ')[0] || "there"}
              </h1>
              <p style={{ fontSize: "1.2rem", color: "var(--rc-text-light)" }}>
                Your wellness journey is our priority.
              </p>
            </div>
            
            <button onClick={() => logout()} style={{ 
              padding: "0.8rem 1.5rem", borderRadius: "12px", backgroundColor: "rgba(231, 76, 60, 0.05)", 
              color: "#e74c3c", border: "1px solid rgba(231, 76, 60, 0.2)", fontWeight: "600", cursor: "pointer"
            }}>
              Sign Out
            </button>
          </div>
        </div>
      </FadeIn>

      {/* Incomplete Profile Alert */}
      {!userData?.profileCompleted && (
        <FadeIn delay={0.1}>
          <div className="glass-card soft-pulse" style={{ 
            padding: "2rem", borderRadius: "24px", backgroundColor: "#fff5f5", 
            border: "2px solid #feb2b2", marginBottom: "3rem", display: "flex", 
            justifyContent: "space-between", alignItems: "center", gap: "1.5rem", flexWrap: "wrap"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
              <div style={{ width: "48px", height: "48px", borderRadius: "50%", backgroundColor: "#fed7d7", color: "#c53030", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Info size={24} />
              </div>
              <div>
                <div style={{ fontWeight: "800", color: "#9b2c2c", fontSize: "1.1rem" }}>Action Required</div>
                <div style={{ color: "#c53030" }}>Complete your clinical intake so Dr. Maryam can prepare for your visit.</div>
              </div>
            </div>
            <Link href="/profile/complete" className="btn-primary" style={{ padding: "1rem 2rem", backgroundColor: "#c53030" }}>
              Complete Intake
            </Link>
          </div>
        </FadeIn>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "2.5rem", alignItems: "start" }}>
        <div>
          {/* Main Action Area */}
          <FadeIn delay={0.2}>
            {nextApt ? (
              <div className="glass-card" style={{ padding: "2.5rem", borderRadius: "32px", marginBottom: "3rem", border: "2px solid var(--rc-primary-light)" }}>
                <div style={{ marginBottom: "2rem" }}>
                  <div style={{ color: "var(--rc-primary-dark)", fontWeight: "700", textTransform: "uppercase", fontSize: "0.8rem", letterSpacing: "2px", marginBottom: "1rem" }}>
                    ⭐ Upcoming Consultation
                  </div>
                  <h2 style={{ fontSize: "2rem", fontWeight: "800", marginBottom: "0.5rem" }}>{nextApt.type}</h2>
                  <p style={{ fontSize: "1.1rem", color: "var(--rc-text-light)" }}>
                    {new Date(nextApt.date).toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long' })} at {nextApt.time}
                  </p>
                </div>
                
                <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                  {nextApt.zoomLink && (
                    <a href={nextApt.zoomLink} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ flex: 1, minWidth: "200px", textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
                      Join Zoom Meeting <ChevronRight size={20} />
                    </a>
                  )}
                  <Link href="/book" className="btn-secondary" style={{ flex: 1, minWidth: "150px", textAlign: "center" }}>
                    Reschedule
                  </Link>
                </div>
              </div>
            ) : (
              <div className="glass-card" style={{ padding: "4rem 2rem", borderRadius: "32px", textAlign: "center", marginBottom: "3rem" }}>
                <h3 style={{ fontSize: "1.5rem", fontWeight: "700", marginBottom: "1rem" }}>No Scheduled Consultations</h3>
                <p style={{ color: "var(--rc-text-light)", marginBottom: "2rem" }}>Take the next step in your health journey today.</p>
                <Link href="/book" className="btn-primary">Book a Session</Link>
              </div>
            )}
          </FadeIn>

          {/* Quick Access Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
            <Link href="/profile/records" className="glass-card" style={{ padding: "2rem", borderRadius: "24px", textDecoration: "none", color: "inherit" }}>
              <FileText size={32} color="var(--rc-primary)" style={{ marginBottom: "1rem" }} />
              <h3 style={{ fontWeight: "700", marginBottom: "0.5rem" }}>History</h3>
              <p style={{ fontSize: "0.85rem", color: "var(--rc-text-light)" }}>View results & notes.</p>
            </Link>
            <Link href="/profile/messages" className="glass-card" style={{ padding: "2rem", borderRadius: "24px", textDecoration: "none", color: "inherit" }}>
              <MessageSquare size={32} color="var(--rc-primary)" style={{ marginBottom: "1rem" }} />
              <h3 style={{ fontWeight: "700", marginBottom: "0.5rem" }}>Messages</h3>
              <p style={{ fontSize: "0.85rem", color: "var(--rc-text-light)" }}>Chat with Dr. Maryam.</p>
            </Link>
          </div>
        </div>

        {/* Sidebar Tools */}
        <aside>
          <FadeIn delay={0.4}>
            <div className="glass-card" style={{ padding: "2rem", borderRadius: "24px", marginBottom: "2rem" }}>
              <h3 style={{ fontWeight: "700", marginBottom: "1.5rem" }}>Share Documents</h3>
              <p style={{ fontSize: "0.9rem", color: "var(--rc-text-light)", marginBottom: "1.5rem" }}>
                Upload previous lab results or scans for review.
              </p>
              <FileUpload />
            </div>

            <div className="glass-card" style={{ padding: "2rem", borderRadius: "24px", backgroundColor: "var(--rc-surface)" }}>
               <h3 style={{ fontWeight: "700", marginBottom: "1rem", fontSize: "1rem" }}>Support</h3>
               <p style={{ fontSize: "0.85rem", color: "var(--rc-text-light)" }}>
                 Need help? Reach out at <strong>support@icare4women.com</strong>
               </p>
            </div>
          </FadeIn>
        </aside>
      </div>
    </div>
  );
}
