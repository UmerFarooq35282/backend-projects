const JWT = require("jsonwebtoken");
const { ErrorResponse } = require("../utils/sendingResponse");

const verifyToken = (secretKey) => {
    return (req, res, next) => {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) return next(new ErrorResponse("Unauthorized - Token missing", 401));

        try {
            const decoded = JWT.verify(token, secretKey);
            req.user = decoded;
            next();
        } catch (err) {
            return next(new ErrorResponse("Invalid or expired token", 401));
        }
    };
};

module.exports = { verifyToken };
