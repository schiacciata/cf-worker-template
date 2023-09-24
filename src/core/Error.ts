import { ErrorOptions, IError } from "@/types/Error";

abstract class BaseError<T extends Error> extends Error implements IError {
    protected error: T;
    public readonly status: number;
    constructor(options: ErrorOptions<T>) {
        super(options.error.message);
        this.error = options.error;
        this.status = options.status || 400;
    }

    getMessages(): string[] {
        return [this.error.message];
    }

    toResponse(): Response {
        return Response.json({
            errors: this.getMessages(),
            code: this.status,
        }, { status: this.status });
    }
};

export default BaseError;