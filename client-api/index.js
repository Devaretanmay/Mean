import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoute.js'; // Change the import statement to match the new file name
import authRoutes from './routes/authRoute.js'; // Import auth routes
import helmet from 'helmet';
import compression from 'compression';
import Joi from 'joi';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';

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

app.use(helmet());
app.use(compression());
app.use(morgan('tiny'));

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

const userValidationSchema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
});

app.post('/signup', async (req, res, next) => {
    try {
        await userValidationSchema.validateAsync(req.body);
        // Proceed with user registration
    } catch (error) {
        next(error);
    }
});

app.use('/api', userRoutes);
app.use('/auth', authRoutes); // Use auth routes under '/auth' prefix
app.get('/', (req, res) => {
  res.send('Welcome to the MERN application!');
});

// Error handling middleware
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        message: err.message,
        stack: process.env.NODE_ENV === 'development' ? err.stack : '🥞'
    });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});