"use client";

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { db } from '@/lib/firebase';
import { collection, query, where, orderBy, onSnapshot, getDocs } from 'firebase/firestore';
import { Conversation, Message, subscribeToMessages, sendMessage } from '@/lib/messaging';
import FadeIn from '@/components/ui/FadeIn';
import { Send, User, Search, Check, CheckCheck, MessageSquare } from 'lucide-react';

export default function DoctorMessagesPage() {
  const { user } = useAuth();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [conversations, setConversations] = useState<any[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [activeConv, setActiveConv] = useState<any>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);

  // Fetch conversations
  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, 'conversations'),
      where('participants', 'array-contains', user.uid),
      orderBy('updatedAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, async (snapshot) => {
      const convs = await Promise.all(snapshot.docs.map(async (doc) => {
        const data = doc.data();
        const patientId = data.participants.find((p: string) => p !== user.uid);
        
        // Fetch patient name (placeholder/simple fetch)
        // In a real app, you'd have a users cache or joined query
        return {
          id: doc.id,
          patientId,
          ...data
        };
      }));
      setConversations(convs);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  // Subscribe to messages when active conversation changes
  useEffect(() => {
    if (!user || !activeConv) return;

    const unsubscribe = subscribeToMessages(user.uid, activeConv.patientId, (msgs) => {
      setMessages(msgs);
    });

    return () => unsubscribe();
  }, [user, activeConv]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !user || !activeConv) return;

    await sendMessage(user.uid, activeConv.patientId, newMessage);
    setNewMessage('');
  };

  return (
    <div style={{ height: "calc(100vh - 120px)", display: "flex", gap: "1.5rem" }}>
      {/* Conversations List */}
      <div className="glass" style={{ width: "350px", borderRadius: "24px", display: "flex", flexDirection: "column" }}>
        <div style={{ padding: "1.5rem", borderBottom: "1px solid var(--rc-border)" }}>
          <h2 style={{ fontSize: "1.2rem", marginBottom: "1rem" }}>Messages</h2>
          <div style={{ position: "relative" }}>
            <Search size={16} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--rc-text-light)" }} />
            <input 
              type="text" 
              placeholder="Search patients..." 
              style={{ width: "100%", padding: "0.8rem 1rem 0.8rem 2.5rem", borderRadius: "10px", border: "1px solid var(--rc-border)", fontSize: "0.9rem" }}
            />
          </div>
        </div>
        
        <div style={{ flex: 1, overflowY: "auto", padding: "1rem" }}>
          {loading ? (
            <div style={{ textAlign: "center", padding: "2rem", color: "var(--rc-text-light)" }}>Loading...</div>
          ) : conversations.length === 0 ? (
            <div style={{ textAlign: "center", padding: "2rem", color: "var(--rc-text-light)" }}>No conversations yet.</div>
          ) : (
            conversations.map((conv) => (
              <div 
                key={conv.id} 
                onClick={() => setActiveConv(conv)}
                style={{ 
                  padding: "1rem", 
                  borderRadius: "16px", 
                  cursor: "pointer",
                  backgroundColor: activeConv?.id === conv.id ? "var(--rc-primary-light)" : "transparent",
                  transition: "all 0.2s ease",
                  marginBottom: "0.5rem"
                }}
                className="hover-lift"
              >
                <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                  <div style={{ width: "45px", height: "45px", borderRadius: "50%", backgroundColor: "var(--rc-primary)", color: "white", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <User size={20} />
                  </div>
                  <div style={{ flex: 1, overflow: "hidden" }}>
                    <div style={{ fontWeight: "600", fontSize: "0.95rem" }}>Patient: {conv.patientId.slice(0, 8)}...</div>
                    <div style={{ fontSize: "0.8rem", color: "var(--rc-text-light)", whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden" }}>
                      {conv.lastMessage || "No messages yet"}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Chat Area */}
      <div className="glass" style={{ flex: 1, borderRadius: "24px", display: "flex", flexDirection: "column" }}>
        {activeConv ? (
          <>
            <div style={{ padding: "1.2rem 2rem", borderBottom: "1px solid var(--rc-border)", display: "flex", alignItems: "center", gap: "15px" }}>
              <div style={{ width: "40px", height: "40px", borderRadius: "50%", backgroundColor: "var(--rc-primary-light)", color: "var(--rc-primary-dark)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <User size={18} />
              </div>
              <div>
                <div style={{ fontWeight: "600" }}>Patient ID: {activeConv.patientId}</div>
                <div style={{ fontSize: "0.75rem", color: "var(--rc-accent)" }}>Online</div>
              </div>
            </div>

            <div style={{ flex: 1, overflowY: "auto", padding: "2rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
              {messages.map((msg, i) => {
                const isMe = msg.senderId === user?.uid;
                return (
                  <div key={i} style={{ 
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
                    <div style={{ fontSize: "0.7rem", color: "var(--rc-text-light)", marginTop: "4px", display: "flex", alignItems: "center", gap: "4px" }}>
                      {msg.createdAt?.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      {isMe && (msg.read ? <CheckCheck size={12} color="var(--rc-accent)" /> : <Check size={12} />)}
                    </div>
                  </div>
                );
              })}
            </div>

            <form onSubmit={handleSend} style={{ padding: "1.5rem", borderTop: "1px solid var(--rc-border)", display: "flex", gap: "1rem" }}>
              <input 
                type="text" 
                value={newMessage}
                onChange={e => setNewMessage(e.target.value)}
                placeholder="Type your message..." 
                style={{ flex: 1, padding: "1rem 1.5rem", borderRadius: "15px", border: "1px solid var(--rc-border)", backgroundColor: "rgba(255,255,255,0.5)", fontSize: "1rem" }}
              />
              <button 
                type="submit"
                style={{ width: "50px", height: "50px", borderRadius: "15px", backgroundColor: "var(--rc-primary)", color: "white", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
              >
                <Send size={20} />
              </button>
            </form>
          </>
        ) : (
          <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--rc-text-light)", flexDirection: "column", gap: "1rem" }}>
            <MessageSquare size={48} strokeWidth={1} />
            <p>Select a patient to start messaging</p>
          </div>
        )}
      </div>
    </div>
  );
}
