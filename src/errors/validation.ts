import BaseError from "@/core/Error";
import { ZodError } from "zod";

class ValidationError extends BaseError<ZodError> {
    constructor(error: ZodError) {
      super({
        error,
      });
    }

    getMessages(): string[] {
        return this.error.issues
            .map(i => i.message);
    }
}
  
export default ValidationError;