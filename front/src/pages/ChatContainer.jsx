import React, { useState, useEffect } from "react";
import ChatComponent from "../components/Chat/ChatComponent";

const ChatContainer = () => {
    const [chats, setChats] = useState([]);
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('token');

        const fetchData = async () => {
            try {
                // Fetch des conversations de l'utilisateur
                const req = await fetch(`http://localhost:3001/api/v1/conv/user/${userId}`, {
                    method: "GET",
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': `${token}`
                    }
                });

                if (!req.ok) {
                    throw new Error('Erreur réseau lors de la récupération des conversations');
                }

                const data2 = await req.json(); // Convertir la réponse en JSON
                setChats(data2);

                // Fetch des utilisateurs
                const req2 = await fetch(`http://localhost:3001/api/v1/users`, {
                    method: "GET",
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': `${token}`
                    }
                });

                if (!req2.ok) {
                    throw new Error('Erreur réseau lors de la récupération des utilisateurs');
                }

                const data = await req2.json(); // Convertir la réponse en JSON
                setUsers(data);
                
            } catch (error) {
                console.error(error.message);
                // Vous pouvez utiliser un état pour gérer l'erreur et l'afficher dans votre composant
                setError(error.message);
            }
        };

        fetchData();

        // Nettoyage de l'erreur après 2 secondes
        const timeout = setTimeout(() => {
            setError("");
        }, 2000);

        // Retour de la fonction pour nettoyer le timeout lors du démontage du composant
        return () => {
            clearTimeout(timeout);
        };

    }, []);

    return (
        <ChatComponent chats={chats} users={users} error={error} />
    );
};

export default ChatContainer;
