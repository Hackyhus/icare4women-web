"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { db } from '@/lib/firebase';
import { doc, getDoc, collection, query, where, getDocs, addDoc, serverTimestamp, orderBy } from 'firebase/firestore';
import FadeIn from '@/components/ui/FadeIn';
import { 
  ArrowLeft, 
  MessageSquare, 
  FileText, 
  Activity, 
  Plus, 
  Calendar,
  Download,
  ExternalLink
} from 'lucide-react';
import Link from 'next/link';
import PartogramChart from '@/components/doctor/Partogram';

export default function PatientDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [patient, setPatient] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [notes, setNotes] = useState<any[]>([]);
  const [newNote, setNewNote] = useState('');
  const [savingNote, setSavingNote] = useState(false);

  useEffect(() => {
    const fetchPatientData = async () => {
      const docRef = doc(db, 'users', id as string);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setPatient(docSnap.data());
      }
      
      // Fetch notes
      const notesRef = collection(db, 'users', id as string, 'notes');
      const notesQuery = query(notesRef, orderBy('createdAt', 'desc'));
      const notesSnap = await getDocs(notesQuery);
      setNotes(notesSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      
      setLoading(false);
    };
    fetchPatientData();
  }, [id]);

  if (loading) return <div style={{ padding: "4rem", textAlign: "center" }}>Loading Clinical Records...</div>;
  if (!patient) return <div style={{ padding: "4rem", textAlign: "center" }}>Patient Not Found</div>;

  return (
    <div style={{ maxWidth: "1200px" }}>
      <FadeIn>
        <button 
          onClick={() => router.back()}
          style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--rc-primary-dark)", border: "none", background: "none", cursor: "pointer", marginBottom: "2rem", fontWeight: "600" }}
        >
          <ArrowLeft size={18} /> Back to Patients
        </button>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end", marginBottom: "3rem" }}>
          <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
            <div style={{ width: "90px", height: "90px", borderRadius: "24px", backgroundColor: "var(--rc-primary-dark)", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2.5rem", fontWeight: "700" }}>
              {patient.name?.[0] || 'P'}
            </div>
            <div>
              <h1 style={{ fontSize: "2.5rem", fontWeight: "700", marginBottom: "0.4rem" }}>{patient.name || 'Anonymous Patient'}</h1>
              <div style={{ display: "flex", gap: "20px", color: "var(--rc-text-light)", fontSize: "0.95rem" }}>
                <span><strong>ID:</strong> {id.toString().slice(0, 8)}</span>
                <span>•</span>
                <span>{patient.email}</span>
              </div>
            </div>
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <Link href={`/doctor/messages?patientId=${id}`} className="btn-secondary" style={{ padding: "0.8rem 1.2rem", borderRadius: "12px", display: "flex", alignItems: "center", gap: "8px", backgroundColor: "var(--rc-primary-light)", color: "var(--rc-primary-dark)", fontWeight: "600" }}>
              <MessageSquare size={18} /> Send Message
            </Link>
            <Link href={`/doctor/prescriptions/new?patientId=${id}`} className="btn-primary" style={{ padding: "0.8rem 1.2rem", borderRadius: "12px", display: "flex", alignItems: "center", gap: "8px", backgroundColor: "var(--rc-primary)", color: "white", fontWeight: "600" }}>
              <Plus size={18} /> New Rx
            </Link>
          </div>
        </div>
      </FadeIn>

      {/* Tabs */}
      <div style={{ display: "flex", gap: "2rem", borderBottom: "1px solid var(--rc-border)", marginBottom: "3rem" }}>
        {[
          { id: 'overview', name: 'Profile Overview', icon: <FileText size={18} /> },
          { id: 'notes', name: 'Consultation Notes', icon: <Calendar size={18} /> },
          { id: 'partogram', name: 'Partography', icon: <Activity size={18} /> },
          { id: 'files', name: 'Uploaded Files', icon: <Download size={18} /> }
        ].map(tab => (
          <button 
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{ 
              padding: "1rem 0",
              border: "none",
              backgroundColor: "transparent",
              color: activeTab === tab.id ? "var(--rc-primary-dark)" : "var(--rc-text-light)",
              fontWeight: activeTab === tab.id ? "700" : "500",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              cursor: "pointer",
              position: "relative",
              transition: "all 0.2s ease"
            }}
          >
            {tab.icon}
            {tab.name}
            {activeTab === tab.id && <div style={{ position: "absolute", bottom: -1, left: 0, right: 0, height: "3px", backgroundColor: "var(--rc-primary-dark)", borderRadius: "3px" }} />}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {activeTab === 'overview' && (
          <FadeIn>
             <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
                <div className="glass" style={{ padding: "2rem", borderRadius: "24px" }}>
                  <h3 style={{ marginBottom: "1.5rem", fontSize: "1.2rem", color: "var(--rc-primary-dark)" }}>Basic Information</h3>
                  <div style={{ display: "grid", gap: "1.2rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span style={{ color: "var(--rc-text-light)" }}>Age</span>
                      <span style={{ fontWeight: "600" }}>{patient.age || 'N/A'}</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span style={{ color: "var(--rc-text-light)" }}>Date of Birth</span>
                      <span style={{ fontWeight: "600" }}>{patient.dob || 'N/A'}</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span style={{ color: "var(--rc-text-light)" }}>Location</span>
                      <span style={{ fontWeight: "600" }}>{patient.location || 'N/A'}</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span style={{ color: "var(--rc-text-light)" }}>Marital Status</span>
                      <span style={{ fontWeight: "600" }}>{patient.maritalStatus || 'N/A'}</span>
                    </div>
                  </div>
                </div>
                <div className="glass" style={{ padding: "2rem", borderRadius: "24px" }}>
                  <h3 style={{ marginBottom: "1.5rem", fontSize: "1.2rem", color: "var(--rc-primary-dark)" }}>Medical Summary</h3>
                  <p style={{ fontSize: "0.95rem", lineHeight: 1.8, color: "var(--rc-text-light)" }}>
                    {patient.medicalHistory || 'No medical history recorded yet.'}
                  </p>
                </div>
             </div>
          </FadeIn>
        )}

        {activeTab === 'notes' && (
          <FadeIn>
            <div className="glass" style={{ padding: "2rem", borderRadius: "24px" }}>
              <h3 style={{ marginBottom: "1.5rem", fontSize: "1.2rem", color: "var(--rc-primary-dark)" }}>Consultation Notes</h3>
              
              <div style={{ marginBottom: "2rem" }}>
                <textarea 
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="Type clinical notes here..."
                  style={{ width: "100%", padding: "1.2rem", borderRadius: "16px", border: "1px solid var(--rc-border)", minHeight: "150px", fontSize: "1rem", marginBottom: "1rem" }}
                />
                <button 
                  onClick={async () => {
                    if (!newNote.trim()) return;
                    setSavingNote(true);
                    const noteRef = await addDoc(collection(db, 'users', id as string, 'notes'), {
                      content: newNote,
                      createdAt: serverTimestamp()
                    });
                    setNotes([{ id: noteRef.id, content: newNote, createdAt: { toDate: () => new Date() } }, ...notes]);
                    setNewNote('');
                    setSavingNote(false);
                  }}
                  disabled={savingNote}
                  className="btn-primary" 
                  style={{ padding: "0.8rem 2rem", borderRadius: "12px", border: "none", backgroundColor: "var(--rc-primary)", color: "white", fontWeight: "600", cursor: "pointer" }}
                >
                  {savingNote ? "Saving..." : "Save Clinical Note"}
                </button>
              </div>

              <div style={{ display: "grid", gap: "1.5rem" }}>
                {notes.length === 0 ? (
                  <p style={{ textAlign: "center", color: "var(--rc-text-light)", padding: "2rem" }}>No previous notes for this patient.</p>
                ) : (
                  notes.map(note => (
                    <div key={note.id} style={{ padding: "1.5rem", borderRadius: "16px", border: "1px solid var(--rc-border)", backgroundColor: "rgba(255,255,255,0.3)" }}>
                      <div style={{ fontSize: "0.8rem", color: "var(--rc-primary-dark)", fontWeight: "600", marginBottom: "8px" }}>
                        {note.createdAt?.toDate ? note.createdAt.toDate().toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : 'Just now'}
                      </div>
                      <p style={{ fontSize: "0.95rem", lineHeight: 1.6, whiteSpace: "pre-wrap" }}>{note.content}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </FadeIn>
        )}

        {activeTab === 'files' && (
           <div style={{ textAlign: "center", padding: "4rem", backgroundColor: "rgba(255,255,255,0.4)", borderRadius: "24px", border: "1px dashed var(--rc-border)" }}>
             <Download size={48} style={{ opacity: 0.2, marginBottom: "1rem" }} />
             <p style={{ color: "var(--rc-text-light)" }}>Secure file vault integration in progress.</p>
           </div>
        )}
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
