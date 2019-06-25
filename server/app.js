import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import authRoutes from './routes/auth';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', authRoutes);

app.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Welcome to chef portfolio',
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('app started');
});

export default app;
