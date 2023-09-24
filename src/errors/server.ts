import ApiError from "./api";

class ServerError extends ApiError {
    constructor(error: Error, debug: boolean = false) {
        super(debug ? error.message : `An error happened, please try again`, 500);
    };
};

export default ServerError;