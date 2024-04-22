import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import { UserAuth } from './AuthContext';
import { collection, addDoc, orderBy, query, onSnapshot, serverTimestamp } from 'firebase/firestore';
import styles from './chat.module.css';

export default function Chat() {
    const { user } = UserAuth();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [error, setError] = useState("");  // State to handle error messages

    useEffect(() => {
        const messagesRef = collection(db, "messages");
        const q = query(messagesRef, orderBy("timestamp"));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map(doc => ({
                id: doc.id,
                text: doc.data().text,
                userId: doc.data().uid,
                timestamp: doc.data().timestamp?.toDate().toTimeString()
            }));
            setMessages(data);
        });

        return () => unsubscribe();
    }, []);

    const sendMessage = async (e) => {
        e.preventDefault();
        if (!newMessage.trim()) {
            setError("Message cannot be empty.");
            return;
        }

        if (!user) {
            setError("You must be logged in to send messages.");
            return;
        }

        try {
            await addDoc(collection(db, "messages"), {
                text: newMessage,
                uid: user.uid,
                timestamp: serverTimestamp()
            });
            setNewMessage("");
            setError("");  // Clear any errors if the message sends successfully
        } catch (error) {
            console.error("Error sending message: ", error);
            if (error.code === "permission-denied") {
                setError("The owl got you, you are now banned for life.");
            } else {
                setError("An error occurred while sending your message.");
            }
        }
    };

    return (
        <main className={styles.main}>
            <div className={styles.messages}>
                {user && messages.map(({ id, text }) => (
                    <p className={styles.message} key={id}>{text}</p>
                ))}
            </div>
            <form className={styles.form} onSubmit={sendMessage}>
                <div className={styles.inputBox}>
                    <input required type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} className={styles.input} />
                    <span className={styles.span}>Owl Chat</span>
                </div>
                <button type="submit" className={styles.send}>Send</button>
            </form>
            {error && <div className={styles.error}>{error}</div>}
        </main>
    );
}
