// below code if showing how to use mongoose with express

const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
require('dotenv').config(); // importing .env file

const jwtPass = process.env.jwtPass; // getting jwtPass from .env file
const mongoUrl = process.env.mongoUrl; // getting mongoUrl from .env file

mongoose.connect(mongoUrl)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

const User = mongoose.model('User', {
    name: String,
    email: String,
    password: String,
});

const app = express();
app.use(express.json());

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Changed query to find user by email and password
        const user = await User.findOne({ email, password }).exec();
        if (!user) {
            return res.status(401).send('Invalid email or password');
        }

        // Sign JWT token using user's email
        const token = jwt.sign({ email: user.email }, jwtPass);
        return res.send(token);
    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).send('Internal server error');
    }
});

app.get('/users', async (req, res) => {
    const token = req.headers.authorization;
    try {
        const decoded = jwt.verify(token, jwtPass);
        const email = decoded.email;

        // Changed query to find all users except the current user
        const users = await User.find({ email: { $ne: email } }).exec();
        return res.send(users);
    } catch (error) {
        console.error('Error during token verification:', error);
        return res.status(401).send('Invalid token');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
