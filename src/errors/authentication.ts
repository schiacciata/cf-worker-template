import ApiError from "./api";

class AuthenticationError extends ApiError {
    constructor() {
        super('You\'re not authorized', 401);
    };
};

export default AuthenticationError;