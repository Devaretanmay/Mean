import User from '../models/user.js';
import bcrypt from 'bcryptjs';

// Register a new user
export const registerUser = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        // Check if user already exists with the same email or username
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(409).send({ message: 'User already exists with the same email or username' });
        }

        // Hash the password before saving to the database
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();
        res.status(201).send({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).send({ message: 'Registration failed', error });
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