const JWT = require("jsonwebtoken");

const generateToken = (payload, secretKey, expiry) => {
    return JWT.sign(payload, secretKey, {
        expiresIn: expiry
    });
}

module.exports = { generateToken }