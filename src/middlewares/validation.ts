import Middleware from "@/core/Middleware";
import ApiError from "@/errors/api";
import ValidationError from "@/errors/validation";
import { ZodError } from "zod";
import { MiddlewareHandleOptions } from "@/types/Middleware";

export class ValidationMiddleware extends Middleware {
    async handle({ route, interceptOptions }: MiddlewareHandleOptions): Promise<Response | undefined> {
        if (!route.bodyValidationSchema) return;

        try {
            const body = route.bodyValidationSchema.parse(await interceptOptions.request.json());
            interceptOptions.validatedBody = body;
        } catch (error) {
            if (error instanceof ZodError) {
                return new ValidationError(error).toResponse();
            }
            return new ApiError('Invalid body', 400).toResponse();
        };
    }
}

export const middleware = new ValidationMiddleware();