// non dumb way of doing input validation

const express = require('express');

const app = express();

const middlewareValid = (req, res, next) => {
    const username = req.headers.username;
    const password = req.headers.password;

    if (username === 'admin' && password === 'admin') {
        next();
    } else {
        res.send(`you're not allowed here mate`);
    }
}

const middlewareKidney = (req, res, next) => {
    const kidneyId = req.query.kidneyId;

    if (kidneyId == 1 || kidneyId == 2) {
        next();
    } else {
        res.send('Invalid input');
    }
}

app.get('/', (req, res) => {
    res.send(`You're on the wrong page mate. You should try logging in.`);
})

app.get('/health-check', middlewareValid, middlewareKidney, (req, res) => {
    res.send(`Loggned in & you're kidney is doing alright`);
})

app.listen(3000)
