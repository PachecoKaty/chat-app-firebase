import { FormEvent, useEffect, useState } from "react"
import { Message } from '@interfaces/chat.interfaces'
import { User } from "firebase/auth"
import { auth, db } from "@services/firebase/baseConfig"
import { addDoc, collection, onSnapshot, orderBy, query } from "firebase/firestore"

const Chat: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState<string>('');
    const [recipient, setRecipient] = useState<string>('');
    const [selectedRecipient, setSelectedRecipient] = useState<string>('')
    const user = auth.currentUser as User

    useEffect(() => {
        // Get real-time messages from Firestore, sorted by timestamp.
        const q = query(collection(db, 'messages'), orderBy('timestamp', 'asc'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const msgs: Message[] = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            } as Message));
            setMessages(msgs);
        });
        return () => unsubscribe();
    }, [])


    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        // Validation
        if (newMessage.trim() === '' || recipient.trim() === '') return;

        // Add a message to Firestone with authenticated user as sender
        await addDoc(collection(db, 'messages'), {
            message: newMessage,
            sender: user.email,
            receptor: recipient,
            timestamp: new Date().toISOString(),
        });

        // Clear the message and recipient field.
        setNewMessage('');
        setRecipient('');
    }

    const filteredMessages = selectedRecipient
        ? messages.filter((msg) => msg.receptor === selectedRecipient && msg.sender === user.email || msg.receptor === user.email && msg.sender === selectedRecipient)
        : []

    const recipients = messages.map(msg => msg.receptor)
    const uniqueRecipients = recipients.filter((receptor, index) => recipients.indexOf(receptor) === index && receptor !== user.email)

    const handleRecipientClick = (rec: string) => {
        setSelectedRecipient(rec)
        setRecipient(rec)
    }

    return (
        <div>
            <h2>Chat</h2>

            <div>
                <h3>Contactos</h3>
                <ul>
                    {uniqueRecipients.map((rec) => (
                        <li key={rec} onClick={() => handleRecipientClick(rec)}>
                            {rec}
                        </li>
                    ))}
                </ul>
            </div>

            <div>
                {filteredMessages.length > 0 ? (
                    filteredMessages.map((msg) => (
                        <div key={msg.id}>
                            <strong>{msg.sender} → {msg.receptor}:</strong> {msg.message}
                        </div>
                    ))
                ) : (
                    <div>No hay mensajes para este contacto.</div>
                )}
            </div>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    placeholder="Contacto"
                />
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Escribe un mensaje..."
                />
                <button type="submit">Enviar</button>
            </form>
        </div>
    );
}

export default Chat