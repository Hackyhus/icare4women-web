"use client";

import React, { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import { Download, Plus, Trash2 } from 'lucide-react';

interface LabItem {
  id: string;
  testName: string;
  category: string;
}

export default function LabRequestCreator() {
  const requestRef = useRef<HTMLDivElement>(null);
  const [patientName, setPatientName] = useState('Sarah Johnson');
  const [clinicalNote, setClinicalNote] = useState('Patient presenting with secondary infertility. Evaluate hormonal profile.');
  const [items, setItems] = useState<LabItem[]>([
    { id: '1', testName: 'Full Blood Count (FBC)', category: 'Hematology' },
    { id: '2', testName: 'FSH/LH/Prolactin', category: 'Endocrinology' }
  ]);

  const addItem = () => {
    setItems([...items, { id: Math.random().toString(), testName: '', category: '' }]);
  };

  const removeItem = (id: string) => {
    setItems(items.filter(i => i.id !== id));
  };

  const updateItem = (id: string, field: keyof LabItem, value: string) => {
    setItems(items.map(i => i.id === id ? { ...i, [field]: value } : i));
  };

  const downloadImage = async () => {
    if (requestRef.current) {
      const canvas = await html2canvas(requestRef.current, {
        scale: 2,
        backgroundColor: '#ffffff',
      });
      const link = document.createElement('a');
      link.download = `LabRequest-${patientName.replace(' ', '-')}-${new Date().toLocaleDateString()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    }
  };

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "2.5rem", alignItems: "start" }}>
      {/* Form Side */}
      <div className="glass" style={{ padding: "2rem", borderRadius: "24px" }}>
        <h3 style={{ marginBottom: "1.5rem" }}>Investigation Details</h3>
        
        <div style={{ marginBottom: "1.5rem" }}>
          <label style={{ display: "block", fontSize: "0.85rem", marginBottom: "5px", color: "var(--rc-text-light)" }}>Patient Name</label>
          <input 
            type="text" 
            value={patientName} 
            onChange={e => setPatientName(e.target.value)}
            style={{ width: "100%", padding: "1rem", borderRadius: "10px", border: "1px solid var(--rc-border)" }}
          />
        </div>

        <div style={{ marginBottom: "2rem" }}>
          <label style={{ display: "block", fontSize: "0.85rem", marginBottom: "5px", color: "var(--rc-text-light)" }}>Clinical Note/Indication</label>
          <textarea 
            value={clinicalNote} 
            onChange={e => setClinicalNote(e.target.value)}
            rows={3}
            style={{ width: "100%", padding: "1rem", borderRadius: "10px", border: "1px solid var(--rc-border)", resize: "none" }}
          />
        </div>

        <div style={{ display: "grid", gap: "1rem" }}>
          <label style={{ fontSize: "0.85rem", color: "var(--rc-text-light)" }}>Requested Tests</label>
          {items.map((item) => (
            <div key={item.id} style={{ 
              display: "flex", 
              gap: "10px",
              padding: "1rem", 
              borderRadius: "12px", 
              backgroundColor: "rgba(255,255,255,0.4)", 
              border: "1px solid var(--rc-border)",
              position: "relative"
            }}>
              <div style={{ flex: 1 }}>
                <input 
                  type="text" 
                  placeholder="e.g. Pelvic Ultrasound"
                  value={item.testName} 
                  onChange={e => updateItem(item.id, 'testName', e.target.value)} 
                  style={{ width: "100%", padding: "0.6rem", borderRadius: "8px", border: "1px solid var(--rc-border)", marginBottom: "5px" }} 
                />
                <input 
                  type="text" 
                  placeholder="Category (optional)"
                  value={item.category} 
                  onChange={e => updateItem(item.id, 'category', e.target.value)} 
                  style={{ width: "100%", padding: "0.4rem 0.6rem", borderRadius: "8px", border: "1px solid var(--rc-border)", fontSize: "0.8rem", opacity: 0.8 }} 
                />
              </div>
              <button 
                onClick={() => removeItem(item.id)}
                style={{ alignSelf: "center", color: "#e74c3c", border: "none", background: "none", cursor: "pointer" }}
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>

        <button 
          onClick={addItem}
          style={{ width: "100%", marginTop: "1.5rem", padding: "1rem", borderRadius: "12px", border: "1px dashed var(--rc-primary)", color: "var(--rc-primary-dark)", fontWeight: "600", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}
        >
          <Plus size={18} /> Add Investigation
        </button>
      </div>

      {/* Preview Side */}
      <div style={{ position: "sticky", top: "2.5rem" }}>
        <div style={{ display: "flex", gap: "10px", marginBottom: "1.5rem" }}>
          <button 
            onClick={downloadImage}
            style={{ flex: 1, padding: "1rem", borderRadius: "12px", backgroundColor: "var(--rc-primary-dark)", color: "white", fontWeight: "600", border: "none", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", cursor: "pointer" }}
          >
            <Download size={18} /> Download Lab Request
          </button>
        </div>

        {/* Lab Request Template */}
        <div ref={requestRef} style={{ 
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
              <p style={{ fontSize: "0.85rem", opacity: 0.8 }}>Consultant Gynecologist</p>
              <h3 style={{ fontSize: "1.1rem", fontWeight: "700", marginTop: "10px" }}>LABORATORY REQUISITION</h3>
            </div>
            <div style={{ textAlign: "right", fontSize: "0.85rem" }}>
              <p>iCare4Women Telehealth</p>
              <p><strong>Date:</strong> {new Date().toLocaleDateString()}</p>
            </div>
          </div>

          {/* Patient Info */}
          <div style={{ marginBottom: "2rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", border: "1px solid #eee", padding: "1.2rem" }}>
            <p style={{ margin: 0 }}><strong>Patient:</strong> {patientName}</p>
            <p style={{ margin: 0 }}><strong>Sex:</strong> Female</p>
          </div>

          {/* Clinical Note */}
          <div style={{ marginBottom: "2rem" }}>
            <p style={{ fontSize: "0.9rem", fontWeight: "700", marginBottom: "5px" }}>CLINICAL INDICATION:</p>
            <p style={{ fontSize: "0.95rem", fontStyle: "italic", borderBottom: "1px solid #f5f5f5", paddingBottom: "10px" }}>{clinicalNote}</p>
          </div>

          {/* Tests List */}
          <div style={{ marginBottom: "4rem" }}>
            <p style={{ fontSize: "0.9rem", fontWeight: "700", marginBottom: "1rem" }}>REQUESTED INVESTIGATIONS:</p>
            <div style={{ display: "grid", gap: "12px" }}>
              {items.map((item, idx) => (
                <div key={idx} style={{ display: "flex", alignItems: "center", gap: "12px", borderBottom: "1px solid #f9f9f9", paddingBottom: "8px" }}>
                  <div style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#000" }} />
                  <div>
                    <span style={{ fontWeight: "700" }}>{item.testName}</span>
                    {item.category && <span style={{ fontSize: "0.8rem", color: "#666", marginLeft: "10px" }}>({item.category})</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer Signature */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end" }}>
            <div>
              <p style={{ fontSize: "0.8rem", fontStyle: "italic" }}>Authorized by Dr. Maryam (MBBS, FWACS)</p>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ borderTop: "1px solid #000", display: "inline-block", padding: "10px 40px", textAlign: "center" }}>
                <p style={{ margin: 0, fontWeight: "700" }}>Dr. Maryam</p>
                <p style={{ margin: 0, fontSize: "0.75rem", opacity: 0.7 }}>Digital Signature</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
