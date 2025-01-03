import express from 'express';
import userRoutes from './modules/users/user.route';
import errorHandler from './libs/middleware/error.middleware';
import cors from 'cors';

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(cors());

app.use('/auth', userRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
