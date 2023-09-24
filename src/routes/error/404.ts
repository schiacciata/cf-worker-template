import Path from "@/core/Path";
import Route from "@/core/Route";
import NotFoundError from "@/errors/notfound";
import { RouteHandleOptions } from "@/types/Route";

class NotFoundRoute extends Route {
    constructor() {
        super({
            path: new Path(),
            errorCode: 404,
        });
    };

    handle(handleDTO: RouteHandleOptions): Response | Promise<Response> {
        const { pathname } = new URL(handleDTO.request.url);
        handleDTO.logger.info('Could not find path', pathname);

        return new NotFoundError(`${pathname} (${handleDTO.request.method}) not found`).toResponse();
    }
}

export const route = new NotFoundRoute();