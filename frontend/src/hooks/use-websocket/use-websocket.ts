import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { addMessage } from '~/store/chat/slice';

const useWebSocket = (url: string, token: string) => {
  const ws = useRef<WebSocket | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    ws.current = new WebSocket(url, token);

    ws.current.onopen = () => {
      console.log('WebSocket connected');
    };

    ws.current.onmessage = (event) => {
      const message = JSON.parse(event.data);
      dispatch(addMessage(message));
    };

    ws.current.onclose = () => {
      console.log('WebSocket disconnected');
    };

    return () => {
      ws.current?.close();
    };
  }, [url, token, dispatch]);

  const sendMessage = (recipientId: number, content: string) => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify({ recipientId, content }));
    }
  };

  return sendMessage;
};

export default useWebSocket;
