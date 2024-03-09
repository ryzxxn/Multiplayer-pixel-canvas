import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

export default function Chats() {
  const socket = io.connect('http://localhost:3001');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Listen for 'chats' event when component mounts
    const handleChats = (packet) => {
      // Update state with new message
      setMessages((prevMessages) => [...prevMessages, packet]);
    };

    socket.on('chats', handleChats);

    // Cleanup function to remove the event listener when component unmounts
    return () => {
      socket.off('chats', handleChats);
    };
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <>
      <div className='chat_box'>
        <p className='header'>Chat:</p>
        {messages.map((message, index) => (
          <p key={index}>{message}</p>
        ))}
      </div>
    </>
  );
}
