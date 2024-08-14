import User from '../models/user.js';
import bcrypt from 'bcryptjs';

// Register a new user
export const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();
        res.status(201).send({ message: 'User registered successfully', user: newUser });
    } catch (error) {
        res.status(500).send({ message: 'Failed to register user', error: error.message || error });
    }
};

// Authenticate a user
export const authenticateUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send({ message: 'Invalid credentials' });
        }
        res.status(200).send({ message: 'User authenticated successfully', user });
    } catch (error) {
        res.status(500).send({ message: 'Authentication failed', error });
    }
};