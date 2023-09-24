import Path from "@/core/Path";
import Route from "@/core/Route";
import ServerError from "@/errors/server";
import { RouteHandleOptions } from "@/types/Route";

export type ServerErrorRouteHanleOptions = RouteHandleOptions & {
    error?: Error | unknown,
}

export class ServerErrorRoute extends Route {
    constructor() {
        super({
            path: new Path(),
            errorCode: 500,
        });
    };

    handle(handleDTO: ServerErrorRouteHanleOptions): Response | Promise<Response> {
        const error = handleDTO.error as Error;
        handleDTO.logger.error('Your cloudflare worker has encountered an error:', handleDTO.error);
        
        return new ServerError(error, handleDTO.config.debug).toResponse();
    }
}

export const route = new ServerErrorRoute();