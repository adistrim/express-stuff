const jwt = require('jsonwebtoken');
const zod = require('zod');
const jwtPass = 'mySecretKey'; // ignore this please

const emailSchema = zod.string().email();
const passwordSchema = zod.string().min(6);

const signJwt = (username, password) => { // validating and signing jsonwebtoken
    const usernameValidation = emailSchema.safeParse(username);
    const passwordValidation = passwordSchema.safeParse(password);

    if (!usernameValidation.success || !passwordValidation.success) {
        return null;
    }

    const signature = jwt.sign({
        username
    }, jwtPass)

    return signature;
}

const decodeJwt = (token) => { // decoding jsonwebtoken
    const decoded = jwt.decode(token);
    if (!decoded) {
        return false
    }
    return true
}

const verifyJwt = (token) => { // verifying jsonwebtoken using try catch
    try {
        jwt.verify(token, jwtPass);
        return true
    } catch (error) {
        return false
    }
}
