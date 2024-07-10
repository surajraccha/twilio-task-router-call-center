import React, { useState, useEffect } from 'react';
import { initializeChat, joinChatChannel, sendMessage } from '../helpers/twilioUtils';

function Chat({ userId, channelName }) {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [channel, setChannel] = useState(null);

  const handleNewMessage = (message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  useEffect(() => {
    const initChat = async () => {
      await initializeChat(userId, handleNewMessage);
      const chatChannel = await joinChatChannel(channelName, handleNewMessage);
      setChannel(chatChannel);
    };

    initChat();
  }, [userId, channelName]);

  const handleSendMessage = async () => {
    if (message.trim() && channel) {
      await sendMessage(channel, message);
      setMessage('');
    }
  };

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className="message">
            <strong>{msg.author}:</strong> {msg.body}
          </div>
        ))}
      </div>
      <div className="message-input">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
}

export default Chat;
