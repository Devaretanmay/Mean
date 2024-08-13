import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';

dotenv.config();

const mongoURI = process.env.MONGO;
if (!mongoURI) {
  console.error('Missing MONGO in the environment variables');
  process.exit(1);
}

mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

const app = express();
const PORT = process.env.PORT || 3000;

app.use('/api', userRoutes);
app.get('/', (req, res) => {
  res.send('Welcome to the MERN application!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});