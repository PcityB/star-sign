import React, { useState } from 'react';
import useWebSocket from '~/hooks/use-websocket/use-websocket';
import { getToken } from '~/utils/auth';
import { useAppSelector } from '~/hooks/hooks';
import { ApiPath } from '~/common/enums/enums';

const Messages: React.FC = () => {
  const [content, setContent] = useState('');
  const [recipientId, setRecipientId] = useState<number | null>(null);

  const { messages } = useAppSelector(({ messages }) => messages);
  const sendMessage = useWebSocket(ApiPath.WS_API_URL, getToken() || '');

  const handleSend = () => {
    if (recipientId && content.trim()) {
      sendMessage(recipientId, content);
      setContent('');
    }
  };

  return (
    <div>
      <h2>Chat</h2>
      <div>
        <label>Recipient ID:</label>
        <input type="number" value={recipientId || ''} onChange={(e) => setRecipientId(Number(e.target.value))} />
      </div>
      <div>
        <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Type your message..." />
      </div>
      <button onClick={handleSend}>Send</button>

      <div>
        <h3>Messages</h3>
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.senderId}:</strong> {msg.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export {Messages};
