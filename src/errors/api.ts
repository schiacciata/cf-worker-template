import BaseError from "@/core/Error";

class ApiError extends BaseError<Error> {
    constructor(message: string, status?: number) {
      super({
        error: new Error(message),
        status,
      });
    }
}
  
export default ApiError;