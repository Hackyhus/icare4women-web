"use client";

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import FadeIn from '@/components/ui/FadeIn';
import { 
  FileText, 
  Download, 
  MessageSquare, 
  Plus, 
  Clock, 
  Activity,
  ShieldCheck
} from 'lucide-react';

export default function PatientRecordsPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('prescriptions');
  const [loading, setLoading] = useState(true);

  // Mock data for now - will be replaced by Firestore queries
  const records = {
    prescriptions: [
      { id: '1', date: '2026-03-15', doctor: 'Dr. Maryam', drug: 'Folic Acid', status: 'Active' },
      { id: '2', date: '2026-02-10', doctor: 'Dr. Maryam', drug: 'Iron Supplements', status: 'Completed' },
    ],
    labs: [
      { id: '1', date: '2026-03-12', doctor: 'Dr. Maryam', test: 'Full Blood Count', status: 'Result Ready' },
    ],
    files: [
      { id: '1', date: '2026-03-05', name: 'Pelvic Ultrasound.pdf', type: 'Imaging' },
    ]
  };

  useEffect(() => {
    // In a real app, fetch from collections: prescriptions, lab_requests, uploads
    // where patientId == user.uid
    setLoading(false);
  }, [user]);

  return (
    <div className="container" style={{ paddingTop: "2rem", paddingBottom: "5rem" }}>
      <FadeIn>
        <div style={{ marginBottom: "3rem" }}>
          <h1 style={{ fontSize: "2.5rem", fontWeight: "700", marginBottom: "0.5rem" }}>My Clinical Records</h1>
          <p style={{ color: "var(--rc-text-light)" }}>Securely access your prescriptions, lab requests, and medical documents.</p>
        </div>
      </FadeIn>

      <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: "3rem" }}>
        {/* Sidebar Nav */}
        <aside>
          <div className="glass" style={{ padding: "1.5rem", borderRadius: "24px" }}>
            {[
              { id: 'prescriptions', name: 'Prescriptions', icon: <FileText size={20} /> },
              { id: 'labs', name: 'Lab Requests', icon: <Activity size={20} /> },
              { id: 'files', name: 'Medical Files', icon: <Download size={20} /> },
              { id: 'messages', name: 'Consultations', icon: <MessageSquare size={20} /> }
            ].map(item => (
              <button 
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                style={{ 
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "1rem",
                  borderRadius: "15px",
                  border: "none",
                  backgroundColor: activeTab === item.id ? "var(--rc-primary-light)" : "transparent",
                  color: activeTab === item.id ? "var(--rc-primary-dark)" : "var(--rc-text-light)",
                  fontWeight: activeTab === item.id ? "600" : "500",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  marginBottom: "0.5rem"
                }}
              >
                {item.icon}
                {item.name}
              </button>
            ))}
          </div>

          <div style={{ marginTop: "2rem", padding: "1.5rem", borderRadius: "24px", backgroundColor: "rgba(159, 189, 163, 0.1)", border: "1px solid rgba(159, 189, 163, 0.2)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "var(--rc-accent)", marginBottom: "10px" }}>
              <ShieldCheck size={18} />
              <span style={{ fontWeight: "600", fontSize: "0.9rem" }}>Data Encrypted</span>
            </div>
            <p style={{ fontSize: "0.8rem", color: "var(--rc-text-light)", lineHeight: 1.5 }}>
              Your medical data is protected with end-to-end encryption and only accessible by you and Dr. Maryam.
            </p>
          </div>
        </aside>

        {/* Main Content */}
        <div style={{ minHeight: "600px" }}>
          <FadeIn key={activeTab}>
            {activeTab === 'prescriptions' && (
              <div style={{ display: "grid", gap: "1.5rem" }}>
                {records.prescriptions.map(pill => (
                  <div key={pill.id} className="glass" style={{ padding: "1.5rem 2rem", borderRadius: "24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                      <div style={{ width: "50px", height: "50px", borderRadius: "15px", backgroundColor: "var(--rc-primary-light)", color: "var(--rc-primary-dark)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <FileText size={24} />
                      </div>
                      <div>
                        <div style={{ fontWeight: "700", fontSize: "1.1rem" }}>{pill.drug}</div>
                        <div style={{ fontSize: "0.85rem", color: "var(--rc-text-light)" }}>Prescribed by {pill.doctor} • {pill.date}</div>
                      </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                       <span style={{ 
                         padding: "4px 12px", borderRadius: "20px", 
                         backgroundColor: pill.status === 'Active' ? "rgba(159, 189, 163, 0.2)" : "#f5f5f5",
                         color: pill.status === 'Active' ? "var(--rc-accent)" : "#999",
                         fontSize: "0.8rem", fontWeight: "600"
                       }}>{pill.status}</span>
                       <button style={{ padding: "10px", borderRadius: "10px", border: "1px solid var(--rc-border)", backgroundColor: "white", color: "var(--rc-primary-dark)" }}>
                         <Download size={18} />
                       </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'files' && (
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
                   <h3 style={{ fontSize: "1.2rem" }}>My Documents</h3>
                   <button style={{ padding: "0.8rem 1.2rem", borderRadius: "12px", backgroundColor: "var(--rc-primary)", color: "white", border: "none", fontWeight: "600", display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                     <Plus size={18} /> Upload New File
                   </button>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.5rem" }}>
                  {records.files.map(file => (
                    <div key={file.id} className="glass hover-lift" style={{ padding: "1.5rem", borderRadius: "20px" }}>
                       <div style={{ marginBottom: "1rem", color: "var(--rc-primary-dark)" }}>
                         <FileText size={32} />
                       </div>
                       <div style={{ fontWeight: "600", marginBottom: "5px" }}>{file.name}</div>
                       <div style={{ fontSize: "0.8rem", color: "var(--rc-text-light)", marginBottom: "1.5rem" }}>
                         {file.type} • {file.date}
                       </div>
                       <button style={{ width: "100%", padding: "0.8rem", borderRadius: "10px", border: "1px solid var(--rc-border)", backgroundColor: "white", fontSize: "0.9rem", fontWeight: "600", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                         <Download size={16} /> Download
                       </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Empty states for others */}
            {(activeTab === 'labs' || activeTab === 'messages') && (
               <div style={{ textAlign: "center", padding: "5rem", backgroundColor: "rgba(255,255,255,0.4)", borderRadius: "30px", border: "1px dashed var(--rc-border)" }}>
                  <Clock size={48} style={{ opacity: 0.1, marginBottom: "1.5rem" }} />
                  <h3 style={{ marginBottom: "10px" }}>Coming Soon</h3>
                  <p style={{ color: "var(--rc-text-light)" }}>We are finalizing the integration for this section.</p>
               </div>
            )}
          </FadeIn>
        </div>
      </div>

      <style jsx>{`
        .glass {
          background: var(--rc-glass-bg);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid var(--rc-glass-border);
        }
      `}</style>
    </div>
  );
}
