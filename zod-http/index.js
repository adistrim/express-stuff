// below code is for express server with zod validation

const express = require('express');
const zod = require('zod');

const app = express();
app.use(express.json());

const validateInput = (obj) => {
    const schema = zod.object({
        email: zod.string().email(),
        password: zod.string().min(8),
    })

    const response = schema.safeParse(obj);
    return response;
}

app.post('/login', (req, res) => {
    const response = validateInput(req.body);

    if (!response.success) {
        res.send('Invalid input');
    }
    // res.send(response.data);
    res.send(response);
});

app.listen(3000)

// q: why this code is not working?
// a: because the validateInput function is not returning anything.

// ok my bad, lol.

