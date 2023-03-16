import Path from "../core/Path";
import Route from "../core/Route";
import { InterceptOptions } from "../types/Router";

class NotFoundRoute extends Route {
    constructor() {
        super({
            path: new Path(),
            method: "GET",
            errorCode: 404,
        });
    };

    handle(handleDTO: InterceptOptions): Response | Promise<Response> {
        return new Response("Page not found");
    }
}

export const route = new NotFoundRoute();