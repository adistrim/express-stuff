### What's zod?
[Zod](https://zod.dev) is a TypeScript-first schema declaration and validation library. It is designed to be easy to use with TypeScript and is inspired by Joi and Yup.

### Below is a simple example of how to use zod with express

```javascript
const express = require('express');
const zod = require('zod');

const app = express();
const schema = zod.array(zod.number());

/*

const schema = zod.object({
    email: zod.string();
    password: zod.string();
    country: zod.literal('IN').or(zod.literal('US'));
    kidney: zor.array(zod.number());
})

*/

app.use(express.json()) 

app.post('/health-check', (req, res) => {
    const kidney = req.body.kidney;
    const response = schema.safeParse(kidney);

    if (!response.success) {
        res.status(400).send(`Can't procces that`);
    }
    res.send(response);
})

app.listen(3000)
```
