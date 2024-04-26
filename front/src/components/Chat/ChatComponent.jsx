import React, { useState, useEffect } from 'react';
import { FaSignOutAlt } from 'react-icons/fa';
import io from "socket.io-client";

const ChatComponent = ({ chats }) => {
    const [selectedChat, setSelectedChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [messageText, setMessageText] = useState('');
    const [userDetails, setUserDetails] = useState({});

    useEffect(() => {
        const socket = io('http://localhost:3002', {
            auth: {
                token: localStorage.getItem('token')
            }
        });

        socket.on('connect', () => {
            console.log('Connected to socket server');
        });

        socket.on('messageCreated', async (newMessage) => {
            console.log('New message created', newMessage);
            console.log(newMessage.sender)
            if (newMessage.receiver === selectedChat) {
                if (!userDetails[newMessage.sender]) {
                    try {
                        const res = await fetch(`http://localhost:3001/api/v1/user/${newMessage.sender}`, {
                            method: 'GET',
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${localStorage.getItem('token')}` }
                        });
                        const data = await res.json();
                        setUserDetails(prev => ({ ...prev, [newMessage.sender]: data.username }));
                    } catch (error) {
                        console.error("Failed to fetch user details:", error);
                    }
                }
                setMessages(prevMessages => [...prevMessages, newMessage]);
            }
        });

        socket.on('disconnect', (reason) => {
            console.log('Disconnected from socket server', reason);
        });

        return () => socket.disconnect();
    }, [selectedChat, userDetails]);

    console.log('user details :',userDetails);

    useEffect(() => {
        if (selectedChat) {
            const chat = chats.find(chat => chat._id === selectedChat);
            if (chat) {
                setMessages(chat.messages);
            }
        }
    }, [selectedChat, chats]);

    const handleChatClick = (chatId) => {
        setSelectedChat(chatId);
    };

    const handleLogout = () => {
        // Code pour la déconnexion
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        // Redirigez vers la page de connexion ou la page d'accueil
        window.location.href = '/login'; // Remplacez par le chemin de votre page de connexion
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const requestBody = {
            sender: [localStorage.getItem("userId")],  // Assurez-vous que c'est bien 'userId' et non 'id' pour être cohérent avec les autres parties du code
            receiver: [selectedChat],
            content: messageText
        };

        console.log("Sending request with body:", requestBody);
        const token = localStorage.getItem('token');
        try {
          const req = await fetch('http://localhost:3001/api/v1/message', {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
              body: JSON.stringify({
              sender : [localStorage.getItem("userId")],
              receiver : [selectedChat],
              content : messageText
            })
          });
        } catch (e) {
          console.error(e.message);
        }
      };

    return (
        <div className="flex flex-col md:flex-row h-screen">
            {/* Liste des chats */}
            <div className="w-full md:w-1/4 bg-gray-800 text-white overflow-y-auto">
                <div className="flex justify-between items-center p-4">
                    <h1 className="text-xl font-bold">Chats</h1>
                    <FaSignOutAlt 
                        className="cursor-pointer text-white text-xl" 
                        onClick={handleLogout}
                    />
                </div>
                <ul>
                    {chats.map((chat) => (
                        <li 
                            key={chat._id} 
                            className={`p-4 cursor-pointer hover:bg-gray-700 ${selectedChat === chat._id ? 'bg-gray-700' : ''}`}
                            onClick={() => handleChatClick(chat._id)}
                        >
                            <div className="flex items-center">
                                {/* Avatar */}
                                <img 
                                    src={chat.avatar || 'https://via.placeholder.com/40'} 
                                    alt="Avatar" 
                                    className="w-8 h-8 rounded-full mr-4"
                                />
                                <div className="flex-1">
                                    <h3 className="text-base font-semibold">{chat.name}</h3>
                                    <p className={`text-xs ${chat.messages.length > 0 && chat.messages[chat.messages.length - 1].isRead ? 'font-bold' : ''} text-gray-400 truncate`}>
                                        {chat.messages.length > 0 ? chat.messages[chat.messages.length - 1].content : 'Aucun message'}
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1">
                                        {chat.messages.length > 0 ? chat.messages[chat.messages.length - 1].date : ''}
                                    </p>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Zone de messages */}
            <div className="flex-1 bg-gray-100">
                {selectedChat ? (
                    <>
                        <h2 className="text-xl font-bold bg-gray-200 p-4">{chats.find(chat => chat._id === selectedChat).name}</h2>
                        <div className="flex-1 p-4 overflow-y-auto">
                            {messages.map((message, index) => (
                                <div 
                                    key={index} 
                                    className={`message ${message.sender._id === selectedChat ? 'self' : 'other'}`}
                                >
                                    <span className="message-sender text-xs text-blue-500">{userDetails[message.sender.username]}</span>
                                    <span className="message-content text-lg">{message.content}</span>
                                </div>
                            ))}
                        </div>
                        {/* Champ de saisie pour le message */}

                        <div className="p-4 bg-white">
                        <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-96">
                            <input
                                type="text"
                                value={messageText}
                                onChange={(e) => setMessageText(e.target.value)}
                                placeholder="Entrez votre message..."
                                className="w-full border rounded py-2 px-3 focus:outline-none focus:ring focus:border-blue-500"
                            />
                            <button
                                type="submit"
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2 focus:outline-none focus:ring focus:border-blue-500"
                            >
                                Envoyer
                            </button>
                            </form>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex items-center justify-center">
                        <p className="text-gray-500">Sélectionnez un chat pour commencer à discuter</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChatComponent;

// Styles
const styles = `
    .message {
        max-width: 80%;
        margin-bottom: 12px;
        padding: 8px 12px;
        border-radius: 12px;
    }

    .message.self {
        align-self: flex-end;
        background-color: #4CAF50;
        color: white;
    }

    .message.other {
        align-self: flex-start;
        background-color: #E0E0E0;
    }

    .message-content {
        display: block;
        font-size: 16px;
    }

    .message-sender {
        display: block;
        font-size: 14px;
        color: #888;
        margin-bottom: 4px;
    }
`;

// Appliquer les styles
const styleElement = document.createElement('style');
styleElement.innerHTML = styles;
document.head.appendChild(styleElement);
