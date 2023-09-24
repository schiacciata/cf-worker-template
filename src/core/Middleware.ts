import ServerError from "@/errors/server";
import { IMiddleware, MiddlewareHandleOptions } from "@/types/Middleware";

class Middleware implements IMiddleware {
    async handle({ interceptOptions }: MiddlewareHandleOptions): Promise<Response | undefined> {
        return new ServerError(new Error('Middleware not implemented'), interceptOptions.config.debug).toResponse();
    };
}

export default Middleware;