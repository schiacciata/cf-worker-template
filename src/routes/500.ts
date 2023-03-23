import Path from "../core/Path";
import Route from "../core/Route";
import { RouteHandleOptions } from "../types/Route";

export class ServerErrorRoute extends Route {
    constructor() {
        super({
            path: new Path(),
            errorCode: 500,
        });
    };

    handle(handleDTO: RouteHandleOptions): Response | Promise<Response> {
        handleDTO.logger.error('Your cloudflare worker has encountered an error:', handleDTO.error);
        
        return new Response(`An error happened, please try again`, {
            status: 500,
        });
    }
}

export const route = new ServerErrorRoute();