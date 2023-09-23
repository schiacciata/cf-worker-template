import Path from "@/core/Path";
import Route from "@/core/Route";
import { RouteHandleOptions } from "@/types/Route";

export type ServerErrorRouteHanleOptions = RouteHandleOptions & {
    error?: string | unknown,
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
        
        return new Response(handleDTO.config.debug ? error.message : `An error happened, please try again`, {
            status: 500,
        });
    }
}

export const route = new ServerErrorRoute();