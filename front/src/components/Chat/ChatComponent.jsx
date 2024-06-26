import React, { useState, useEffect } from 'react';
import { FaSignOutAlt } from 'react-icons/fa';
import io from "socket.io-client";
import { useNavigate, Link } from 'react-router-dom';
import AdminConv from '../AdminConv/AdminConv';

const ChatComponent = ({ chats,users }) => {
    const [selectedChat, setSelectedChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [messageText, setMessageText] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingMessageId, setEditingMessageId] = useState(null);
    const [selectedUser, setSelectedUser] = useState(''); // État pour stocker l'utilisateur sélectionné
    const [selectedUsername, setSelectedUsername] = useState('');
    const handleSubmitCreateConv = async (e) => {
        const token = localStorage.getItem('token');

        e.preventDefault();
         let userSelected=users.find(user => user._id === selectedUser);
         console.log(userSelected)
        try {
            const req = await fetch('http://localhost:3001/api/v1/conv', {
                method: "POST",
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    admins : [localStorage.getItem("userId")],
                    members : [selectedUser],
                    name : userSelected.username
                })
            });
            if (req.ok) {
                setMessageText('');
            } else {
                throw new Error('Failed to send message');
            }
        } catch (error) {
            console.error('Error sending message:', error);
        }

        // Insérez ici la logique pour créer une nouvelle conversation avec l'utilisateur sélectionné
        console.log("Conversation créée avec l'utilisateur:", selectedUser);
    };
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
                setMessages(prevMessages => [...prevMessages, newMessage]);
            }
        });

        socket.on('messageUpdated', (updatedMessage) => {
            setMessages(prevMessages => prevMessages.map(msg => msg._id === updatedMessage._id ? updatedMessage : msg));
        });

        socket.on('messageDeleted', (data) => {
            setMessages(prevMessages => prevMessages.filter(msg => msg._id !== data.messageId));
        });

        socket.on('disconnect', (reason) => {
            console.log('Disconnected from socket server', reason);
        });

        return () => socket.disconnect();
    }, [selectedChat]);

    //console.log(messages)

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
            sender: [localStorage.getItem("userId")],
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
            if (req.ok) {
                setMessageText('');
            } else {
                throw new Error('Failed to send message');
            }
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    const handleDeleteMessage = async (messageId) => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`http://localhost:3001/api/v1/message/${messageId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.ok) {
                setMessages(messages.filter(msg => msg._id !== messageId));
            } else {
                throw new Error('Failed to delete message');
            }
        } catch (error) {
            console.error('Error deleting message:', error);
        }
    };


    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };



    return (
        <div className="flex flex-col md:flex-row h-screen">
            {/* Liste des chats */}
            <div className="w-full md:w-1/4 bg-gray-800 text-white overflow-y-auto">
                <div className="flex justify-between items-center p-4">
                    <h1 className="text-xl font-bold">Chats</h1>
                    <button>
                       <Link to="/Profile" className="text-blue-500 hover:underline">Profile</Link>
                    </button>
                    <FaSignOutAlt
                        className="cursor-pointer text-white text-xl"
                        onClick={handleLogout}
                    />
                </div>
                <div>
                <form onSubmit={handleSubmitCreateConv} className="flex items-center">
    <select
        value={selectedUser}
        onChange={(e) => setSelectedUser(e.target.value)}
        className="mr-2 text-black"
    >
        <option value="">Sélectionner un utilisateur</option>
        {users.map(user => (
            <option key={user._id} value={user._id}>{user.username}</option>
        ))}
    </select>
    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Chatez
    </button>
</form>
                </div>
                <ul>
                    {chats.map((chat) => (
                        <li
                            key={chat._id}
                            className={`p-4 cursor-pointer hover:bg-gray-700 ${selectedChat === chat._id ? 'bg-gray-700' : ''}`}
                            onClick={() => handleChatClick(chat._id)}
                        >
                            <div className="flex items-center">
                                <img
                                    src={chat.avatar || 'https://via.placeholder.com/40'}
                                    alt="Avatar"
                                    className="w-8 h-8 rounded-full mr-4"
                                />
                                <div className="flex-1">
                                    <h3 className="text-base font-semibold">{chat.name}</h3>
                                    <p className={`text-xs text-gray-400 truncate`}>
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
            <div className="flex-1 flex flex-col bg-gray-100">
                <div className="flex  bg-gray-200 p-4">
                    <h2 className="text-xl font-bold mr-20">{selectedChat ? chats.find(chat => chat._id === selectedChat).name : "Sélectionnez un chat"}</h2>
                    {selectedChat ? (
                        <button hide={selectedChat} className='font-bold hover:bg-gray-300 p-1 rounded-xl' onClick={openModal}>administrer groupe</button>
                    ) : null}
                    <AdminConv isOpen={isModalOpen} onClose={closeModal} ConvInfo={chats.find(chat => chat._id === selectedChat)}></AdminConv>
                </div>
                <div className="flex-1 overflow-y-auto p-4">
                    {selectedChat && messages.map((message, index) => (
                        <div
                            key={index}
                            className={`flex mb-4 ${message.sender._id === localStorage.getItem("userId") ? 'justify-end' : 'justify-start'}`}
                        >
                            <div className={`rounded px-4 py-2 ${message.sender._id === localStorage.getItem("userId") ? 'bg-gray-800 text-white' : 'bg-gray-300 text-black'}`}>
                                <span className="block text-xs text-gray-600">{message.sender.username}</span>
                                <span className="block text-lg">{message.content}</span>
                                {message.sender._id === localStorage.getItem("userId") && (
                                    <div className="text-sm mt-2">
                                        <button className="text-red-500" onClick={() => handleDeleteMessage(message._id)}>Delete</button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
                {/* Champ de saisie pour le message */}
                <div
                    className="p-4 bg-gray-100">  {/* Changé de bg-white à bg-gray-100 pour une transition douce avec le reste */}
                    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto">
                        <input
                            type="text"
                            value={messageText}
                            onChange={(e) => setMessageText(e.target.value)}
                            placeholder="Entrez votre message..."
                            className="form-input w-full border-0 p-3 rounded-md shadow-sm focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition duration-150 ease-in-out"
                        />
                        <button
                            type="submit"
                            className="mt-4 w-full bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
                        >
                            Envoyer
                        </button>
                    </form>
                </div>
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
