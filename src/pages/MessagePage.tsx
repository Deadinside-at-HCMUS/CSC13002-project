import React, { useState, useEffect } from "react";
import MessageBox from "../components/Message/Message";

export interface MessageData {
    id: number;
    sender: string;
    receiver: string;
    message: string;
    timestamp: string;
}

const MessagePage: React.FC = () => {
    const [messages, setMessages] = useState<MessageData[]>([
        {
            id: 1,
            sender: "Alice",
            receiver: "self",
            message: "Hello there!",
            timestamp: "2023-08-10 14:30",
        },
        {
            id: 2,
            sender: "Bob",
            receiver: "self",
            message: "Hey, how are you?",
            timestamp: "2023-08-10 15:45",
        },
        {
            id: 3,
            sender: "self",
            receiver: "Alice",
            message: "Noon!",
            timestamp: "2023-08-10 15:59",
        },
        // ... add more messages
    ]);

    const [selectedContact, setSelectedContact] = useState<string | null>(null);
    const [inputMessage, setInputMessage] = useState("");

    useEffect(() => {
        setSelectedContact("Alice"); // Set the desired default contact here
    }, []);

    const handleSendMessage = () => {
        if (inputMessage.trim() !== "") {
            const newMessage: MessageData = {
                id: messages.length + 1,
                sender: "self",
                receiver: selectedContact || "",
                message: inputMessage,
                timestamp: new Date().toLocaleString(),
            };
            setMessages((prevMessages) => [...prevMessages, newMessage]);
            setInputMessage("");
        }
    };

    const handleConversation = (contact: string) => {
        setSelectedContact(contact);
    };

    const filteredMessages = selectedContact
        ? messages.filter(
            (message) =>
                (message.sender === selectedContact &&
                    message.receiver === "self") ||
                (message.sender === "self" &&
                    message.receiver === selectedContact)
        )
        : messages;

    return (
        <div className="flex h-screen bg-gray-100">
            <div className="w-1/4 bg-white p-4">
                <div className="text-gray-700 font-semibold mb-4">Contacts</div>
                <ul className="space-y-2">
                    {/* Updated contact list items */}
                    {["Alice", "Bob"].map((contact) => (
                        <li
                            key={contact}
                            className={`flex items-center space-x-2 cursor-pointer ${selectedContact === contact ? "font-semibold text-blue-600" : ""
                                }`}
                            onClick={() => handleConversation(contact)}
                        >
                            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                                {contact.charAt(0)}
                            </div>
                            <p>{contact}</p>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="flex-1 p-4 overflow-y-auto">
                <div className="space-y-4">
                    {/* Updated message display */}
                    {filteredMessages.map((message) => (
                        <MessageBox key={message.id} data={message} />
                    ))}
                </div>

                <div className="mt-4">
                    <textarea
                        className="w-full p-2 border rounded-md shadow focus:outline-none focus:border-blue-400 resize-none"
                        style={{ height: "90px" }}
                        placeholder="Type your message..."
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                    />
                    <button
                        className={`bg-blue-500 text-white px-4 py-2 mt-2 rounded-md hover:bg-blue-600 ${inputMessage.trim() === "" ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                        onClick={handleSendMessage}
                        disabled={inputMessage.trim() === ""}
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MessagePage;
