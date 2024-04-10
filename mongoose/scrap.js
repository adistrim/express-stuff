const express = require('express')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
require('dotenv').config(); // importing .env file

const jwtPass = process.env.jwtPass; // getting jwtPass from .env file
const mongoUrl = process.env.mongoUrl; // getting mongoUrl from .env file

/*
example of .env file:

jwtPass=123456
mongoUrl=mongodb://localhost:27017
*/

try {
    mongoose.connect(mongoUrl);
    console.log('Connected to MongoDB');
} catch (error) {
    console.error('Error connecting to MongoDB:', error);
}

const User = mongoose.model('User', {
    name: String,
    email: String,
    password: String,
})

// const createUser = async () => {
//     try {
//         const user = new User({
//             name: 'Aditya',
//             email: 'aditya@gmail.com',
//             password: 'aditya',
//         });

//         await user.save();
//         console.log('User created successfully:', user);
//     } catch (error) {
//         console.error('Error creating user:', error);
//     }
// }

// createUser()

const app = express()
app.use(express.json())

const userExists = (username, password) => {
    let userExists = false
    for (let i = 0; i < ALL_USERS.length; i++) {
        if (ALL_USERS[i].username == username && ALL_USERS[i].password == password) {
            userExists = true
            break
        }
    }
    return userExists
}

app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if (!userExists(username, password)) {
        return res.status(401).send('Maybe you need to signup first');
    }

    var token = jwt.sign({username: username}, jwtpass);

    return res.send(token);
})

app.get('/users', (req, res) => {
    const token = req.headers.authorization;
    try {
        const decoded = jwt.verify(token, jwtpass);
        const username = decoded.username;
        return res.send(
            ALL_USERS.filter((value) => {
                if (value.username == username) {
                    return false;
                }
                return true;
            })
        );
    } catch (e) {
        return res.status(401).send('Invalid request');
    }
})

app.listen(3000)