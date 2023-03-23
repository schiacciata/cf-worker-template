import Path from "../core/Path";
import Route from "../core/Route";
import { InterceptOptions } from "../types/Router";

class MainRoute extends Route {
    constructor() {
        super({
            path: new Path().setUp("/"),
            method: "GET"
        });
    };

    handle(handleDTO: InterceptOptions): Response | Promise<Response> {
        handleDTO.logger.log("Hello World!");
        
        return new Response("Hello World!");
    }
}

export const route = new MainRoute();