"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/context/AuthContext';
import { db } from '@/lib/firebase';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { Message, subscribeToMessages, sendMessage } from '@/lib/messaging';
import FadeIn from '@/components/ui/FadeIn';
import { Send, User, MessageSquare, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function PatientMessagesPage() {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [doctorId, setDoctorId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Find the doctor to message (for now, find from existing conversations or use a known doctor ID)
  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, 'conversations'),
      where('participants', 'array-contains', user.uid),
      orderBy('updatedAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        const convData = snapshot.docs[0].data();
        const otherParticipant = convData.participants.find((p: string) => p !== user.uid);
        if (otherParticipant) {
          setDoctorId(otherParticipant);
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  // Subscribe to messages once we have the doctor ID
  useEffect(() => {
    if (!user || !doctorId) return;

    const unsubscribe = subscribeToMessages(user.uid, doctorId, (msgs) => {
      setMessages(msgs);
    });

    return () => unsubscribe();
  }, [user, doctorId]);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !user || !doctorId) return;

    await sendMessage(user.uid, doctorId, newMessage);
    setNewMessage('');
  };

  if (!user) {
    return (
      <div className="container" style={{ padding: "8rem 1.5rem", textAlign: "center" }}>
        <p>Please <Link href="/login" style={{ color: "var(--rc-primary-dark)", fontWeight: "700" }}>log in</Link> to view your messages.</p>
      </div>
    );
  }

  return (
    <div className="container" style={{ paddingTop: "2rem", paddingBottom: "2rem", maxWidth: "900px" }}>
      <FadeIn>
        <div style={{ marginBottom: "2rem" }}>
          <Link href="/profile" style={{ display: "inline-flex", alignItems: "center", gap: "8px", color: "var(--rc-primary-dark)", fontWeight: "600", textDecoration: "none", marginBottom: "1rem" }}>
            <ArrowLeft size={18} /> Back to Dashboard
          </Link>
          <h1 style={{ fontSize: "2rem", fontWeight: "700", marginBottom: "0.5rem" }}>Messages</h1>
          <p style={{ color: "var(--rc-text-light)" }}>Private, secure communication with Dr. Maryam.</p>
        </div>
      </FadeIn>

      <div className="glass" style={{ borderRadius: "24px", overflow: "hidden", border: "1px solid var(--rc-border)", minHeight: "500px", display: "flex", flexDirection: "column" }}>
        {loading ? (
          <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--rc-text-light)" }}>
            Loading messages...
          </div>
        ) : !doctorId ? (
          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "4rem", color: "var(--rc-text-light)", gap: "1rem" }}>
            <MessageSquare size={48} strokeWidth={1} />
            <h3 style={{ fontWeight: "700", color: "var(--rc-text-main)" }}>No conversations yet</h3>
            <p style={{ textAlign: "center", maxWidth: "400px" }}>
              After your first consultation with Dr. Maryam, you&apos;ll be able to message her directly here for follow-up questions.
            </p>
          </div>
        ) : (
          <>
            {/* Chat Header */}
            <div style={{ padding: "1.2rem 2rem", borderBottom: "1px solid var(--rc-border)", display: "flex", alignItems: "center", gap: "15px", backgroundColor: "rgba(255,255,255,0.5)" }}>
              <div style={{ width: "40px", height: "40px", borderRadius: "50%", backgroundColor: "var(--rc-primary-light)", color: "var(--rc-primary-dark)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <User size={18} />
              </div>
              <div>
                <div style={{ fontWeight: "600" }}>Dr. Maryam</div>
                <div style={{ fontSize: "0.75rem", color: "var(--rc-text-light)" }}>Your Consultant</div>
              </div>
            </div>

            {/* Messages Area */}
            <div style={{ flex: 1, overflowY: "auto", padding: "2rem", display: "flex", flexDirection: "column", gap: "1rem", maxHeight: "400px" }}>
              {messages.length === 0 ? (
                <div style={{ textAlign: "center", color: "var(--rc-text-light)", padding: "3rem" }}>
                  <p>No messages yet. Send your first message below.</p>
                </div>
              ) : (
                messages.map((msg, i) => {
                  const isMe = msg.senderId === user?.uid;
                  return (
                    <div key={msg.id || i} style={{
                      alignSelf: isMe ? "flex-end" : "flex-start",
                      maxWidth: "70%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: isMe ? "flex-end" : "flex-start"
                    }}>
                      <div style={{
                        padding: "0.8rem 1.2rem",
                        borderRadius: isMe ? "20px 20px 0 20px" : "20px 20px 20px 0",
                        backgroundColor: isMe ? "var(--rc-primary)" : "var(--rc-surface)",
                        color: isMe ? "white" : "var(--rc-text-main)",
                        boxShadow: "var(--shadow-sm)",
                        border: isMe ? "none" : "1px solid var(--rc-border)"
                      }}>
                        {msg.text}
                      </div>
                      <div style={{ fontSize: "0.7rem", color: "var(--rc-text-light)", marginTop: "4px" }}>
                        {msg.createdAt?.toDate?.()?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) || ''}
                      </div>
                    </div>
                  );
                })
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <form onSubmit={handleSend} style={{ padding: "1.5rem", borderTop: "1px solid var(--rc-border)", display: "flex", gap: "1rem", backgroundColor: "rgba(255,255,255,0.5)" }}>
              <input
                type="text"
                value={newMessage}
                onChange={e => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                style={{ flex: 1, padding: "1rem 1.5rem", borderRadius: "15px", border: "1px solid var(--rc-border)", backgroundColor: "rgba(255,255,255,0.8)", fontSize: "1rem", outline: "none" }}
              />
              <button
                type="submit"
                disabled={!newMessage.trim()}
                style={{ width: "50px", height: "50px", borderRadius: "15px", backgroundColor: "var(--rc-primary)", color: "white", border: "none", cursor: newMessage.trim() ? "pointer" : "not-allowed", display: "flex", alignItems: "center", justifyContent: "center", opacity: newMessage.trim() ? 1 : 0.5, transition: "opacity 0.2s ease" }}
              >
                <Send size={20} />
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
