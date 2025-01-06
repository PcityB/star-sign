import express from 'express';
import userRoutes from './modules/users/user.route';
import attributeRoutes from './modules/attributes/attribute.route';
import preferenceRoutes from './modules/preferences/preference.route';
import errorHandler from './libs/middleware/error.middleware';
import cors from 'cors';

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(cors());

app.use('/', userRoutes);
app.use('/', attributeRoutes);
app.use('/preferences', preferenceRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
