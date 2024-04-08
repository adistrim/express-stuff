// creating a http server
const express = require('express');

const app = express();

function sum(n) {
    ans = 0;
    for (let i = 1; i <= n; i++) {
        ans += i;
    }
    return ans;
}


app.get('/', function(req, res) {
    const n = req.query.n;
    const ans = sum(n);
    res.send('your answer is: ' + ans);
})


app.listen(3000);
