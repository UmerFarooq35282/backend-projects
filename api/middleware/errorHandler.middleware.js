const { SuccessResponse, ErrorResponse } = require("../utils/sendingResponse.js");

const errorHandlerMiddleware = (err, req, res, next) => {
    if (err instanceof SuccessResponse || err instanceof ErrorResponse) {
        return err.send(res);
    }

    console.error("Unhandled Error:", err);

    let message = "Internal Server Error";
    let details = [];

    if (typeof err === "string") {
        details = [err];
    } else if (err instanceof Error) {
        details = [err.message];
    } else if (err && typeof err === "object") {
        details = [JSON.stringify(err)];
    }

    if (err.name === "JsonWebTokenError") {
        return new ErrorResponse("Invalid token", 401).send(res);
    }
    if (err.name === "TokenExpiredError") {
        return new ErrorResponse("Token expired", 401).send(res);
    }

    return new ErrorResponse(message, 500, details).send(res);
}

module.exports = { errorHandlerMiddleware }