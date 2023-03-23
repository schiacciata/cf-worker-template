import Path from "../core/Path";
import Route from "../core/Route";
import { InterceptOptions } from "../types/Router";

class NotFoundRoute extends Route {
    constructor() {
        super({
            path: new Path(),
            errorCode: 404,
        });
    };

    handle(handleDTO: InterceptOptions): Response | Promise<Response> {
        const { pathname } = new URL(handleDTO.request.url);
        handleDTO.logger.log('Could not find path', pathname);

        return new Response(`${pathname} (${handleDTO.request.method}) not found`, {
            status: 404,
        });
    }
}

export const route = new NotFoundRoute();