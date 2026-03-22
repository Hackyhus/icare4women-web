"use client";

import React, { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import { Download, Save, Plus, Trash2 } from 'lucide-react';

interface PrescriptionItem {
  id: string;
  drug: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
}

export default function PrescriptionCreator() {
  const prescriptionRef = useRef<HTMLDivElement>(null);
  const [patientName, setPatientName] = useState('Sarah Johnson');
  const [items, setItems] = useState<PrescriptionItem[]>([
    { id: '1', drug: 'Folic Acid', dosage: '5mg', frequency: 'Once daily', duration: '3 months', instructions: 'Take with water' }
  ]);

  const addItem = () => {
    setItems([...items, { id: Math.random().toString(), drug: '', dosage: '', frequency: '', duration: '', instructions: '' }]);
  };

  const removeItem = (id: string) => {
    setItems(items.filter(i => i.id !== id));
  };

  const updateItem = (id: string, field: keyof PrescriptionItem, value: string) => {
    setItems(items.map(i => i.id === id ? { ...i, [field]: value } : i));
  };

  const downloadImage = async () => {
    if (prescriptionRef.current) {
      const canvas = await html2canvas(prescriptionRef.current, {
        scale: 2,
        backgroundColor: '#ffffff',
      });
      const link = document.createElement('a');
      link.download = `Prescription-${patientName.replace(' ', '-')}-${new Date().toLocaleDateString()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    }
  };

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "2.5rem", alignItems: "start" }}>
      {/* Form Side */}
      <div className="glass" style={{ padding: "2rem", borderRadius: "24px" }}>
        <h3 style={{ marginBottom: "1.5rem" }}>Prescription Details</h3>
        
        <div style={{ marginBottom: "2rem" }}>
          <label style={{ display: "block", fontSize: "0.85rem", marginBottom: "5px", color: "var(--rc-text-light)" }}>Patient Name</label>
          <input 
            type="text" 
            value={patientName} 
            onChange={e => setPatientName(e.target.value)}
            style={{ width: "100%", padding: "1rem", borderRadius: "10px", border: "1px solid var(--rc-border)" }}
          />
        </div>

        <div style={{ display: "grid", gap: "1.5rem" }}>
          {items.map((item) => (
            <div key={item.id} style={{ 
              padding: "1.2rem", 
              borderRadius: "16px", 
              backgroundColor: "rgba(255,255,255,0.4)", 
              border: "1px solid var(--rc-border)",
              position: "relative"
            }}>
              <button 
                onClick={() => removeItem(item.id)}
                style={{ position: "absolute", top: "10px", right: "10px", color: "#e74c3c", border: "none", background: "none", cursor: "pointer" }}
              >
                <Trash2 size={16} />
              </button>
              
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "10px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.75rem", marginBottom: "4px" }}>Drug Name</label>
                  <input type="text" value={item.drug} onChange={e => updateItem(item.id, 'drug', e.target.value)} style={{ width: "100%", padding: "0.6rem", borderRadius: "8px", border: "1px solid var(--rc-border)" }} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.75rem", marginBottom: "4px" }}>Dosage</label>
                  <input type="text" value={item.dosage} onChange={e => updateItem(item.id, 'dosage', e.target.value)} style={{ width: "100%", padding: "0.6rem", borderRadius: "8px", border: "1px solid var(--rc-border)" }} />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.75rem", marginBottom: "4px" }}>Frequency</label>
                  <input type="text" value={item.frequency} onChange={e => updateItem(item.id, 'frequency', e.target.value)} style={{ width: "100%", padding: "0.6rem", borderRadius: "8px", border: "1px solid var(--rc-border)" }} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.75rem", marginBottom: "4px" }}>Duration</label>
                  <input type="text" value={item.duration} onChange={e => updateItem(item.id, 'duration', e.target.value)} style={{ width: "100%", padding: "0.6rem", borderRadius: "8px", border: "1px solid var(--rc-border)" }} />
                </div>
              </div>
            </div>
          ))}
        </div>

        <button 
          onClick={addItem}
          style={{ width: "100%", marginTop: "1.5rem", padding: "1rem", borderRadius: "12px", border: "1px dashed var(--rc-primary)", color: "var(--rc-primary-dark)", fontWeight: "600", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}
        >
          <Plus size={18} /> Add Medication
        </button>
      </div>

      {/* Preview Side */}
      <div style={{ position: "sticky", top: "2.5rem" }}>
        <div style={{ display: "flex", gap: "10px", marginBottom: "1.5rem" }}>
          <button 
            onClick={downloadImage}
            style={{ flex: 1, padding: "1rem", borderRadius: "12px", backgroundColor: "var(--rc-primary)", color: "white", fontWeight: "600", border: "none", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", cursor: "pointer" }}
          >
            <Download size={18} /> Download Image
          </button>
          <button style={{ padding: "1rem", borderRadius: "12px", backgroundColor: "var(--rc-accent)", color: "white", fontWeight: "600", border: "none", cursor: "pointer" }}>
            <Save size={18} />
          </button>
        </div>

        {/* Prescription Template */}
        <div ref={prescriptionRef} style={{ 
          width: "100%", 
          backgroundColor: "#fff", 
          padding: "3rem", 
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
          borderRadius: "4px",
          color: "#000",
          fontFamily: "'Inter', sans-serif"
        }}>
          {/* Header */}
          <div style={{ borderBottom: "2px solid #000", paddingBottom: "1.5rem", marginBottom: "2rem", display: "flex", justifyContent: "space-between", alignItems: "start" }}>
            <div>
              <h2 style={{ fontSize: "1.8rem", fontWeight: "800", margin: 0 }}>Dr. Maryam</h2>
              <p style={{ fontSize: "0.85rem", opacity: 0.8 }}>MBBS, FWACS (OBGYN)</p>
              <p style={{ fontSize: "0.85rem" }}>Consultant Gynecologist</p>
            </div>
            <div style={{ textAlign: "right", fontSize: "0.85rem" }}>
              <p>iCare4Women Telehealth</p>
              <p>{new Date().toLocaleDateString()}</p>
            </div>
          </div>

          {/* Rx Icon */}
          <div style={{ fontSize: "2.5rem", fontWeight: "800", marginBottom: "1.5rem" }}>℞</div>

          {/* Patient Info */}
          <div style={{ marginBottom: "2rem" }}>
            <p style={{ fontSize: "1rem" }}><strong>Patient:</strong> {patientName}</p>
          </div>

          {/* Table */}
          <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "3rem" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #eee", textAlign: "left", fontSize: "0.9rem" }}>
                <th style={{ padding: "0.8rem 0" }}>Medication</th>
                <th style={{ padding: "0.8rem 0" }}>Dosage</th>
                <th style={{ padding: "0.8rem 0" }}>Frequency</th>
                <th style={{ padding: "0.8rem 0" }}>Duration</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, idx) => (
                <tr key={idx} style={{ borderBottom: "1px solid #f9f9f9", fontSize: "0.95rem" }}>
                  <td style={{ padding: "1.2rem 0" }}>
                    <div style={{ fontWeight: "700" }}>{item.drug}</div>
                    <div style={{ fontSize: "0.8rem", opacity: 0.7 }}>{item.instructions}</div>
                  </td>
                  <td>{item.dosage}</td>
                  <td>{item.frequency}</td>
                  <td>{item.duration}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Footer Signature */}
          <div style={{ marginTop: "4rem", textAlign: "right" }}>
            <div style={{ borderTop: "1px solid #000", display: "inline-block", padding: "10px 40px", textAlign: "center" }}>
              <p style={{ margin: 0, fontWeight: "700" }}>Dr. Maryam</p>
              <p style={{ margin: 0, fontSize: "0.75rem", opacity: 0.7 }}>Digital Signature</p>
            </div>
          </div>

          <div style={{ marginTop: "4rem", borderTop: "1px solid #eee", paddingTop: "1rem", fontSize: "0.75rem", opacity: 0.5, textAlign: "center" }}>
            This prescription was generated securely via iCare4Women Telehealth Portal.
          </div>
        </div>
      </div>
    </div>
  );
}
