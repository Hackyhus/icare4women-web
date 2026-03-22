import { db } from "./firebase";
import { 
  collection, 
  addDoc, 
  query, 
  orderBy, 
  onSnapshot, 
  serverTimestamp,
  doc,
  updateDoc
} from "firebase/firestore";

export interface Message {
  id?: string;
  senderId: string;
  receiverId: string;
  text: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  createdAt: any;
  read: boolean;
}

export interface Conversation {
  id?: string;
  participants: string[]; // [doctorId, patientId]
  lastMessage?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updatedAt: any;
}

// Send a message
export const sendMessage = async (senderId: string, receiverId: string, text: string) => {
  const messageData = {
    senderId,
    receiverId,
    text,
    createdAt: serverTimestamp(),
    read: false
  };
  
  // Find or create conversation
  // For this MVP, we can just use a simple messages collection with a conversationId or composite key
  // Let's use a composite key for simplicity in finding threads: sort([uid1, uid2]).join('_')
  const conversationId = [senderId, receiverId].sort().join('_');
  
  const messagesRef = collection(db, 'conversations', conversationId, 'messages');
  await addDoc(messagesRef, messageData);
  
  // Update the conversation's last message and timestamp
  const convRef = doc(db, 'conversations', conversationId);
  await updateDoc(convRef, {
    lastMessage: text,
    updatedAt: serverTimestamp(),
    participants: [senderId, receiverId]
  }).catch(async (err) => {
    // If conversation doc doesn't exist, create it (legacy firebase behavior or specific rules might need setDoc)
    if (err.code === 'not-found') {
      const { setDoc } = await import("firebase/firestore");
      await setDoc(convRef, {
        lastMessage: text,
        updatedAt: serverTimestamp(),
        participants: [senderId, receiverId]
      });
    }
  });
};

// Subscribe to messages
export const subscribeToMessages = (userId1: string, userId2: string, callback: (messages: Message[]) => void) => {
  const conversationId = [userId1, userId2].sort().join('_');
  const messagesRef = collection(db, 'conversations', conversationId, 'messages');
  const q = query(messagesRef, orderBy('createdAt', 'asc'));
  
  return onSnapshot(q, (snapshot) => {
    const messages = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Message));
    callback(messages);
  });
};
