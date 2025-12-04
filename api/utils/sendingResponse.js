class SuccessResponse {
    constructor(message = "Success", data = {}, statusCode = 200) {
        this.success = true;
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
    }

    send(res) {
        return res.status(this.statusCode).json({
            success: this.success,
            message: this.message,
            data: this.data,
        });
    }
}

class ErrorResponse {
    constructor(message = "Something went wrong", statusCode = 500, errors = []) {
        this.success = false;
        this.statusCode = statusCode;
        this.message = message;
        this.errors = errors;
    }

    send(res) {
        return res.status(this.statusCode).json({
            success: this.success,
            message: this.message,
            errors: this.errors,
        });
    }
}

module.exports = { SuccessResponse, ErrorResponse };
