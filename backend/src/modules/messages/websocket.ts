import { MessageService } from './message.service';
import { WebSocketServer, WebSocket } from 'ws';
import { token } from '~/libs/token/token';

const userConnections = new Map<number, WebSocket>();
const messageService = new MessageService();

export const setupWebSocket = (server: any) => {
  const wss = new WebSocketServer({ server });

  wss.on('connection', (ws, req) => {
    const jwtToken = req.headers['sec-websocket-protocol'];
    if (!jwtToken) {
      ws.close();
      return;
    }

    const { valid, payload } = token.verifyToken(jwtToken);

    if (!valid) {
      ws.close();
      return;
    }

    if (!(payload && typeof payload === 'object' && 'id' in payload)) {
      ws.close();
      return;
    }

    try {
      const userId = payload.id;
      userConnections.set(userId, ws);

      console.log(`User ${userId} connected via WebSocket`);

      ws.on('message', async (data) => {
        try {
          const { recipientId, content } = JSON.parse(data.toString());
          console.log(`Message from ${userId} to ${recipientId}: ${content}`);
          messageService.create({ senderId: userId, recipientId, content });
          const recipientSocket = userConnections.get(recipientId);
          if (recipientSocket) {
            recipientSocket.send(JSON.stringify({ senderId: userId, content }));
          }
        } catch (err) {
          console.error('Error processing message:', err);
        }
      });

      ws.on('close', () => {
        userConnections.delete(userId);
        console.log(`User ${userId} disconnected`);
      });
    } catch (err) {
      console.error('WebSocket connection error:', err);
      ws.close();
    }
  });

  return wss;
};
