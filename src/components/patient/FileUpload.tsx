"use client";

import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, AlertCircle } from 'lucide-react';
import { storage, db } from '@/lib/firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useAuth } from '@/context/AuthContext';

export default function FileUpload({ onComplete }: { onComplete?: () => void }) {
  const { user } = useAuth();
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (!user || acceptedFiles.length === 0) return;
    
    setUploading(true);
    setError(null);
    const file = acceptedFiles[0];
    
    try {
      const storageRef = ref(storage, `patient_uploads/${user.uid}/${Date.now()}_${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on('state_changed', 
        (snapshot) => {
          const p = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(p);
        }, 
        (err) => {
          setError(err.message);
          setUploading(false);
        }, 
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          
          // Save to Firestore
          await addDoc(collection(db, 'uploads'), {
            patientId: user.uid,
            name: file.name,
            url: downloadURL,
            type: file.type,
            size: file.size,
            createdAt: serverTimestamp(),
            status: 'pending_review'
          });

          setUploading(false);
          setProgress(0);
          if (onComplete) onComplete();
        }
      );
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : 'Upload failed';
      setError(errMsg);
      setUploading(false);
    }
  }, [user, onComplete]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop,
    maxFiles: 1,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png'],
      'application/pdf': ['.pdf']
    }
  });

  return (
    <div className="glass" style={{ padding: "2rem", borderRadius: "24px" }}>
      <div 
        {...getRootProps()} 
        style={{
          border: `2px dashed ${isDragActive ? 'var(--rc-primary)' : 'var(--rc-border)'}`,
          borderRadius: "16px",
          padding: "3rem 2rem",
          textAlign: "center",
          cursor: "pointer",
          backgroundColor: isDragActive ? "rgba(209, 162, 181, 0.05)" : "transparent",
          transition: "all 0.2s ease"
        }}
      >
        <input {...getInputProps()} />
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
          {uploading ? (
            <>
              <div style={{ width: "60px", height: "60px", borderRadius: "50%", border: "4px solid var(--rc-primary-light)", borderTopColor: "var(--rc-primary)", animation: "spin 1s linear infinite" }} />
              <p style={{ fontWeight: "600" }}>Uploading... {Math.round(progress)}%</p>
            </>
          ) : (
            <>
              <div style={{ width: "64px", height: "64px", borderRadius: "50%", backgroundColor: "var(--rc-primary-light)", color: "var(--rc-primary-dark)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Upload size={28} />
              </div>
              <div>
                <p style={{ fontWeight: "700", fontSize: "1.1rem", marginBottom: "5px" }}>
                  {isDragActive ? "Drop the file here" : "Upload Medical Report"}
                </p>
                <p style={{ fontSize: "0.85rem", color: "var(--rc-text-light)" }}>
                  PNG, JPG or PDF up to 10MB
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      {error && (
        <div style={{ marginTop: "1rem", padding: "1rem", borderRadius: "12px", border: "1px solid #e74c3c", backgroundColor: "rgba(231, 76, 60, 0.1)", color: "#e74c3c", display: "flex", alignItems: "center", gap: "10px", fontSize: "0.9rem" }}>
          <AlertCircle size={18} />
          {error}
        </div>
      )}

      <style jsx>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
