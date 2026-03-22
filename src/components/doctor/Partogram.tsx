"use client";

import React from 'react';

interface PartogramPoint {
  time: number; // Hours from start of active labor
  dilation: number; // 0-10 cm
  descent: number; // 0-5
}

interface PartogramProps {
  data: PartogramPoint[];
  startTime: Date;
}

const PartogramChart: React.FC<PartogramProps> = ({ data }) => {
  const width = 600;
  const height = 400;
  const padding = 40;
  
  const xScale = (h: number) => padding + (h * (width - 2 * padding) / 24);
  const yScale = (d: number) => height - padding - (d * (height - 2 * padding) / 10);
  
  // Alert line starts at 4cm at 0h, and reaches 10cm at 6h (1cm/h)
  const alertLine = [
    { x: xScale(0), y: yScale(4) },
    { x: xScale(6), y: yScale(10) }
  ];
  
  // Action line is 4 hours to the right of the alert line
  const actionLine = [
    { x: xScale(4), y: yScale(4) },
    { x: xScale(10), y: yScale(10) }
  ];

  return (
    <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '12px', border: '1px solid var(--rc-border)' }}>
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        {/* Grid Lines */}
        {[...Array(25)].map((_, i) => (
          <line 
            key={`v-${i}`} 
            x1={xScale(i)} y1={padding} 
            x2={xScale(i)} y2={height - padding} 
            stroke="#eee" strokeWidth="1" 
          />
        ))}
        {[...Array(11)].map((_, i) => (
          <line 
            key={`h-${i}`} 
            x1={padding} y1={yScale(i)} 
            x2={width - padding} y2={yScale(i)} 
            stroke="#eee" strokeWidth="1" 
          />
        ))}

        {/* Axes */}
        <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="#333" strokeWidth="2" />
        <line x1={padding} y1={padding} x2={padding} y2={height - padding} stroke="#333" strokeWidth="2" />

        {/* Labels */}
        <text x={width / 2} y={height - 5} textAnchor="middle" fontSize="12">Hours of Labor</text>
        <text x={10} y={height / 2} textAnchor="middle" fontSize="12" transform={`rotate(-90, 10, ${height/2})`}>Cervical Dilation (cm)</text>

        {/* Alert & Action Lines */}
        <line x1={alertLine[0].x} y1={alertLine[0].y} x2={alertLine[1].x} y2={alertLine[1].y} stroke="orange" strokeWidth="2" strokeDasharray="5,5" />
        <text x={alertLine[1].x} y={alertLine[1].y - 5} fill="orange" fontSize="10" fontWeight="bold">ALERT</text>
        
        <line x1={actionLine[0].x} y1={actionLine[0].y} x2={actionLine[1].x} y2={actionLine[1].y} stroke="red" strokeWidth="2" />
        <text x={actionLine[1].x} y={actionLine[1].y - 5} fill="red" fontSize="10" fontWeight="bold">ACTION</text>

        {/* Dilation Data Line */}
        {data.length > 1 && (
          <path 
            d={data.map((p, i) => `${i === 0 ? 'M' : 'L'} ${xScale(p.time)} ${yScale(p.dilation)}`).join(' ')} 
            fill="none" stroke="var(--rc-primary)" strokeWidth="3" 
          />
        )}
        
        {/* Dilation Points (X) */}
        {data.map((p, i) => (
          <g key={`d-${i}`}>
            <line x1={xScale(p.time)-5} y1={yScale(p.dilation)-5} x2={xScale(p.time)+5} y2={yScale(p.dilation)+5} stroke="var(--rc-primary-dark)" strokeWidth="2" />
            <line x1={xScale(p.time)+5} y1={yScale(p.dilation)-5} x2={xScale(p.time)-5} y2={yScale(p.dilation)+5} stroke="var(--rc-primary-dark)" strokeWidth="2" />
          </g>
        ))}

        {/* Descent Points (O) */}
        {data.map((p, i) => (
          <circle 
            key={`desc-${i}`} 
            cx={xScale(p.time)} cy={yScale(p.descent * 2)} // Scaled descent to fit dilation axis for visual comparison
            r="5" fill="none" stroke="var(--rc-accent)" strokeWidth="2" 
          />
        ))}
      </svg>
      
      <div style={{ marginTop: '15px', display: 'flex', gap: '20px', fontSize: '0.85rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <span style={{ color: 'var(--rc-primary-dark)', fontWeight: 'bold' }}>X</span> Cervical Dilation
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <span style={{ color: 'var(--rc-accent)', fontSize: '1.2rem' }}>○</span> Fetal Descent
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <div style={{ width: '20px', height: '0', borderTop: '2px dashed orange' }}></div> Alert Line
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <div style={{ width: '20px', height: '0', borderTop: '2px solid red' }}></div> Action Line
        </div>
      </div>
    </div>
  );
};

export default PartogramChart;
