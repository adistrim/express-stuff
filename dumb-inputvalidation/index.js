// dumb way of doing input validation

// This is a simple express server that has a health-check endpoint that requires a username, password and kidneyId query parameter.


const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send('Hello middleware');
})

app.get('/health-check', (req, res) => {
    const username = req.headers.username;
    const password = req.headers.password;
    const kidneyId = req.query.kidneyId;

    if (username === 'admin' && password === 'admin') {
        if (kidneyId == 1 || kidneyId == 2) {
            res.send('Logged in & your kidney is fine');
        }
        res.send('Logged in & your kidney is not fine');
    }
    res.status(400).send('failed');
});


app.listen(3000)
