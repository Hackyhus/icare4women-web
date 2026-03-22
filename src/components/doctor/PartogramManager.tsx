"use client";

import React, { useState } from 'react';
import PartogramChart from './Partogram';
import { Plus, Save } from 'lucide-react';

export default function PartogramManager() {
  const [data, setData] = useState([
    { time: 0, dilation: 4, descent: 4 },
    { time: 2, dilation: 6, descent: 3 },
  ]);
  
  const [newPoint, setNewPoint] = useState({ time: 4, dilation: 7, descent: 2 });

  const addPoint = () => {
    setData([...data, newPoint].sort((a,b) => a.time - b.time));
  };

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: "2rem" }}>
      <div>
        <h3 style={{ marginBottom: "1.5rem" }}>Labor Monitoring Progress</h3>
        <PartogramChart data={data} startTime={new Date()} />
      </div>

      <div className="glass" style={{ padding: "1.5rem", borderRadius: "20px" }}>
        <h3 style={{ marginBottom: "1.5rem", fontSize: "1.1rem" }}>Add Clinical Observation</h3>
        
        <div style={{ display: "grid", gap: "1.2rem" }}>
          <div>
            <label style={{ display: "block", fontSize: "0.85rem", marginBottom: "5px", color: "var(--rc-text-light)" }}>
              Hours from active labor
            </label>
            <input 
              type="number" 
              value={newPoint.time} 
              onChange={e => setNewPoint({...newPoint, time: Number(e.target.value)})}
              style={{ width: "100%", padding: "0.8rem", borderRadius: "8px", border: "1px solid var(--rc-border)" }}
            />
          </div>
          
          <div>
            <label style={{ display: "block", fontSize: "0.85rem", marginBottom: "5px", color: "var(--rc-text-light)" }}>
              Cervical Dilation (cm)
            </label>
            <input 
              type="number" min="0" max="10"
              value={newPoint.dilation} 
              onChange={e => setNewPoint({...newPoint, dilation: Number(e.target.value)})}
              style={{ width: "100%", padding: "0.8rem", borderRadius: "8px", border: "1px solid var(--rc-border)" }}
            />
          </div>

          <div>
            <label style={{ display: "block", fontSize: "0.85rem", marginBottom: "5px", color: "var(--rc-text-light)" }}>
              Fetal Descent (0-5)
            </label>
            <input 
              type="number" min="0" max="5"
              value={newPoint.descent} 
              onChange={e => setNewPoint({...newPoint, descent: Number(e.target.value)})}
              style={{ width: "100%", padding: "0.8rem", borderRadius: "8px", border: "1px solid var(--rc-border)" }}
            />
          </div>

          <button 
            onClick={addPoint}
            style={{
              marginTop: "1rem",
              padding: "1rem",
              borderRadius: "12px",
              backgroundColor: "var(--rc-primary)",
              color: "white",
              fontWeight: "600",
              border: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              cursor: "pointer"
            }}
          >
            <Plus size={18} />
            Record Observation
          </button>
        </div>

        <div style={{ marginTop: "2rem", paddingTop: "1.5rem", borderTop: "1px solid var(--rc-border)" }}>
           <button style={{
             width: "100%",
             padding: "1rem",
             borderRadius: "12px",
             backgroundColor: "var(--rc-accent)",
             color: "white",
             fontWeight: "600",
             border: "none",
             cursor: "pointer",
             display: "flex",
             alignItems: "center",
             justifyContent: "center",
             gap: "10px"
           }}>
             <Save size={18} />
             Save Partogram to EHR
           </button>
        </div>
      </div>
    </div>
  );
}
