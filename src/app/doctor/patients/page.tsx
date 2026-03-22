"use client";

import React, { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, query, getDocs } from 'firebase/firestore';
import FadeIn from '@/components/ui/FadeIn';
import { Search, Filter, MoreHorizontal, Calendar, Eye } from 'lucide-react';
import Link from 'next/link';

export default function DoctorPatientsPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [patients, setPatients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchPatients = async () => {
      const q = query(collection(db, 'users')); // Filter by role='patient' in real app
      const querySnapshot = await getDocs(q);
      const docs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPatients(docs);
      setLoading(false);
    };
    fetchPatients();
  }, []);

  const filteredPatients = patients.filter(p => 
    p.name?.toLowerCase().includes(search.toLowerCase()) || 
    p.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ maxWidth: "1200px" }}>
      <FadeIn>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2.5rem" }}>
          <div>
            <h1 style={{ fontSize: "2.2rem", fontWeight: "700", marginBottom: "0.5rem" }}>Patient List</h1>
            <p style={{ color: "var(--rc-text-light)" }}>Manage and review clinical records for all your patients.</p>
          </div>
        </div>
      </FadeIn>

      <div className="glass" style={{ padding: "1.5rem", borderRadius: "24px", marginBottom: "2rem" }}>
        <div style={{ display: "flex", gap: "1rem" }}>
          <div style={{ position: "relative", flex: 1 }}>
            <Search size={18} style={{ position: "absolute", left: "15px", top: "50%", transform: "translateY(-50%)", color: "var(--rc-text-light)" }} />
            <input 
              type="text" 
              placeholder="Search by name, email, or ID..." 
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ width: "100%", padding: "1rem 1rem 1rem 3rem", borderRadius: "12px", border: "1px solid var(--rc-border)", fontSize: "1rem" }}
            />
          </div>
          <button style={{ padding: "1rem 1.5rem", borderRadius: "12px", border: "1px solid var(--rc-border)", backgroundColor: "white", display: "flex", alignItems: "center", gap: "10px", fontWeight: "600", cursor: "pointer" }}>
            <Filter size={18} /> Filters
          </button>
        </div>
      </div>

      <div style={{ backgroundColor: "var(--rc-surface)", borderRadius: "24px", border: "1px solid var(--rc-border)", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
          <thead style={{ backgroundColor: "var(--rc-primary-light)", fontSize: "0.9rem", color: "var(--rc-primary-dark)" }}>
            <tr>
              <th style={{ padding: "1.5rem" }}>Patient</th>
              <th style={{ padding: "1.5rem" }}>Contact</th>
              <th style={{ padding: "1.5rem" }}>Last Consultation</th>
              <th style={{ padding: "1.5rem" }}>Status</th>
              <th style={{ padding: "1.5rem" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={5} style={{ padding: "3rem", textAlign: "center" }}>Loading patients...</td></tr>
            ) : filteredPatients.length === 0 ? (
              <tr><td colSpan={5} style={{ padding: "3rem", textAlign: "center" }}>No patients found.</td></tr>
            ) : (
              filteredPatients.map((p) => (
                <tr key={p.id} style={{ borderBottom: "1px solid var(--rc-border)", fontSize: "0.95rem" }} className="hover-lift">
                  <td style={{ padding: "1.5rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <div style={{ width: "40px", height: "40px", borderRadius: "50%", backgroundColor: "var(--rc-primary-light)", color: "var(--rc-primary-dark)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "700" }}>
                        {p.name?.[0] || 'P'}
                      </div>
                      <div style={{ fontWeight: "600" }}>{p.name || 'Anonymous Patient'}</div>
                    </div>
                  </td>
                  <td style={{ padding: "1.5rem", color: "var(--rc-text-light)" }}>{p.email}</td>
                  <td style={{ padding: "1.5rem" }}>
                     <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.85rem" }}>
                       <Calendar size={14} color="var(--rc-primary-dark)" />
                       {p.lastVisit || 'N/A'}
                     </div>
                  </td>
                  <td style={{ padding: "1.5rem" }}>
                    <span style={{ 
                      padding: "4px 12px", 
                      borderRadius: "20px", 
                      backgroundColor: "rgba(159, 189, 163, 0.2)", 
                      color: "var(--rc-accent)",
                      fontSize: "0.8rem",
                      fontWeight: "600"
                    }}>Active</span>
                  </td>
                  <td style={{ padding: "1.5rem" }}>
                    <div style={{ display: "flex", gap: "8px" }}>
                      <Link href={`/doctor/patients/${p.id}`} style={{ padding: "8px", borderRadius: "8px", backgroundColor: "var(--rc-primary-light)", color: "var(--rc-primary-dark)" }}>
                        <Eye size={18} />
                      </Link>
                      <button style={{ padding: "8px", borderRadius: "8px", border: "1px solid var(--rc-border)", backgroundColor: "white" }}>
                        <MoreHorizontal size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
