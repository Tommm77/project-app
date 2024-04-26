import React, { useState, useEffect } from 'react';
import { FaSignOutAlt } from 'react-icons/fa';

const MessagerieComponent = ({ chats }) => {
    const [selectedChat, setSelectedChat] = useState(null);
    const [messages, setMessages] = useState([]);

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

    // Fonction pour générer une couleur à partir de l'ID de l'utilisateur
    const generateColorFromUserId = (userId) => {
        const colors = ['#FF5733', '#33FF57', '#3357FF', '#FF33A8', '#33FFE0', '#FFD700'];
        const index = userId % colors.length;
        return colors[index];
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
                                    <span className="message-sender text-xs text-blue-500">{message.sender.username}</span>
                                    <span className="message-content text-lg">{message.content}</span>
                                </div>
                            ))}
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

export default MessagerieComponent;

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
