import ApiError from "./api";

class NotFoundError extends ApiError {
    constructor(message: string) {
        super(message, 404);
    };
};

export default NotFoundError;