"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs, orderBy, limit } from "firebase/firestore";
import Link from "next/link";
import FadeIn from "@/components/ui/FadeIn";
import { DashboardSkeleton } from "@/components/ui/Skeleton";
import { Clock, ArrowRight, Users, CalendarCheck, FileText, MessageSquare } from "lucide-react";

interface Appointment {
  id: string;
  patientName?: string;
  patientId?: string;
  type?: string;
  date?: string;
  time?: string;
  zoomLink?: string;
}

export default function DoctorDashboard() {
  const { userData } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  const stats = [
    { name: "Total Patients", value: "—", icon: <Users size={24} /> },
    { name: "Today's Sessions", value: "0", icon: <CalendarCheck size={24} /> },
    { name: "Prescriptions", value: "—", icon: <FileText size={24} /> },
    { name: "Unread Messages", value: "0", icon: <MessageSquare size={24} /> },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const q = query(
          collection(db, "appointments"),
          orderBy("date", "desc"),
          limit(10)
        );
        const snapshot = await getDocs(q);
        const apts = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Appointment[];
        setAppointments(apts);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <DashboardSkeleton />;

  const nextApt = appointments[0] || null;

  return (
    <div style={{ maxWidth: "1200px", paddingBottom: "4rem" }}>
      <FadeIn>
        <div className="bg-glow" style={{ padding: "3rem 0", marginBottom: "2rem" }}>
          <h1 className="text-gradient" style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: "800", marginBottom: "0.5rem" }}>
            Good Day, Dr. Maryam
          </h1>
          <p style={{ color: "var(--rc-text-light)", fontSize: "1.1rem" }}>
            Your clinic is thriving. You have {stats[1].value} consultations scheduled for today.
          </p>
        </div>
      </FadeIn>

      {/* Primary Focus Card: Next Patient */}
      <FadeIn delay={0.1}>
        <div className="glass-card soft-pulse" style={{ 
          padding: "2.5rem", borderRadius: "32px", marginBottom: "3rem", 
          border: "2px solid var(--rc-primary-light)",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          flexWrap: "wrap", gap: "2rem", background: "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(188, 122, 147, 0.05) 100%)"
        }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--rc-primary-dark)", fontWeight: "700", textTransform: "uppercase", fontSize: "0.8rem", letterSpacing: "1.5px", marginBottom: "1rem" }}>
              <Clock size={16} /> Up Next
            </div>
            {nextApt ? (
              <>
                <h2 style={{ fontSize: "2.2rem", fontWeight: "800", marginBottom: "0.5rem" }}>{nextApt.patientName || "Aisha Suleiman"}</h2>
                <div style={{ display: "flex", gap: "10px", color: "var(--rc-text-light)", fontSize: "1.05rem" }}>
                  <span>{nextApt.type || "Gynae Consultation"}</span>
                  <span>•</span>
                  <span>Starts at {nextApt.time || "10:30 AM"}</span>
                </div>
              </>
            ) : (
              <h2 style={{ fontSize: "1.8rem", color: "var(--rc-text-light)" }}>No upcoming appointments</h2>
            )}
          </div>
          
          <div style={{ display: "flex", gap: "1rem" }}>
            {nextApt?.patientId && (
              <Link href={`/doctor/patients/${nextApt.patientId}`} style={{ 
                padding: "1rem 2rem", borderRadius: "14px", backgroundColor: "var(--rc-secondary-light, var(--rc-primary-light))", 
                color: "var(--rc-primary-dark)", fontWeight: "700", textDecoration: "none", border: "1px solid var(--rc-primary-light)"
              }}>
                Review Files
              </Link>
            )}
            {nextApt?.zoomLink && (
              <a href={nextApt.zoomLink} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                Begin Session <ArrowRight size={20} />
              </a>
            )}
          </div>
        </div>
      </FadeIn>

      {/* Grid Layout */}
      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", 
        gap: "2.5rem" 
      }}>
        {/* Statistics Cluster */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
          {stats.map((stat) => (
            <div key={stat.name} className="glass-card" style={{ padding: "1.5rem", borderRadius: "24px", textAlign: "center" }}>
               <div style={{ color: "var(--rc-primary)", marginBottom: "0.5rem" }}>{stat.icon}</div>
               <div style={{ fontSize: "1.5rem", fontWeight: "800" }}>{stat.value}</div>
               <div style={{ fontSize: "0.8rem", color: "var(--rc-text-light)", fontWeight: "600" }}>{stat.name}</div>
            </div>
          ))}
        </div>

        {/* Quick Commands & Schedule */}
        <div style={{ display: "grid", gap: "1.5rem" }}>
           <div className="glass-card" style={{ padding: "2rem", borderRadius: "24px" }}>
              <h3 style={{ marginBottom: "1.5rem", fontSize: "1.1rem", fontWeight: "700" }}>Clinical Tools</h3>
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                <Link href="/doctor/prescriptions/new" className="btn-primary" style={{ flex: 1, padding: "1rem", fontSize: "0.9rem", textAlign: "center" }}>
                  + Prescription
                </Link>
                <Link href="/doctor/lab-requests/new" className="btn-secondary" style={{ flex: 1, padding: "1rem", fontSize: "0.9rem", textAlign: "center" }}>
                  + Lab Request
                </Link>
              </div>
           </div>

           <div className="glass-card" style={{ padding: "2rem", borderRadius: "24px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
                <h3 style={{ fontWeight: "700" }}>Recent Patients</h3>
                <Link href="/doctor/patients" style={{ fontSize: "0.85rem", color: "var(--rc-primary-dark)", fontWeight: "700" }}>See All</Link>
              </div>
              <div style={{ display: "grid", gap: "1rem" }}>
                {appointments.slice(1, 4).map(apt => (
                  <div key={apt.id} style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                    <div style={{ width: "40px", height: "40px", borderRadius: "10px", backgroundColor: "var(--rc-primary-light)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "800", color: "var(--rc-primary-dark)" }}>
                      {apt.patientName?.[0] || "P"}
                    </div>
                    <div>
                      <div style={{ fontWeight: "600", fontSize: "0.95rem" }}>{apt.patientName || "Patient"}</div>
                      <div style={{ fontSize: "0.8rem", color: "var(--rc-text-light)" }}>{apt.date || "Today"}</div>
                    </div>
                  </div>
                ))}
                {appointments.length <= 1 && (
                  <p style={{ color: "var(--rc-text-light)", fontSize: "0.9rem" }}>No recent patients to display.</p>
                )}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
