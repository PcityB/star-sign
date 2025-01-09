import express from 'express';
import userRoutes from './modules/users/user.route';
import attributeRoutes from './modules/attributes/attribute.route';
import preferenceRoutes from './modules/preferences/preference.route';
import matchRoutes from './modules/matches/match.route';
import messageRoutes from './modules/messages/message.route';
import ideaRoutes from './modules/ideas/idea.route';
import errorHandler from './libs/middleware/error.middleware';
import cors from 'cors';
import http from 'http';
import { setupWebSocket } from './modules/messages/websocket';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.use('/', userRoutes);
app.use('/preferences', preferenceRoutes);
app.use('/attributes', attributeRoutes);
app.use('/matches', matchRoutes);
app.use('/messages', messageRoutes);
app.use('/ideas', ideaRoutes);
app.use(errorHandler);

const server = http.createServer(app);
setupWebSocket(server);

server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
