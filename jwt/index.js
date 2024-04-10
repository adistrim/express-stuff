// This is a simple example of how to use JWT in a simple express app
// This is not a production ready code, this is just a simple example
// This code is not tested or optimized, this is just a simple example

const express = require('express')
const jwt = require('jsonwebtoken')

const jwtpass = '123456'
const app = express()
app.use(express.json())

// in memory mini database
const ALL_USERS = [
    {
        email: 'adistrim',
        username: 'aditya',
        password: 'aditya',
    },
    {
        email: 'ws9090',
        username: 'wahyu',
        password: 'wahyu',
    },
    {
        email: 'david',
        username: 'david',
        password: 'david',
    }
]

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
        const username = decoded.username; // this line is not required if there's no filteration
        return res.send(
            ALL_USERS.filter((value) => {
                if (value.username == username) { // username got from decoded token
                    return false;
                }
                return true; // basically filter out the user who is requesting
            })
        );
    } catch (e) {
        return res.status(401).send('Invalid request');
    }
})

app.listen(3000)