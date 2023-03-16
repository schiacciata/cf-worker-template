import { RouteOptions, HTTPMethod } from "../types/Route";
import { InterceptOptions } from "../types/Router";
import Path from "./Path";

abstract class Route {
    path: Path;
    method: HTTPMethod;
    errorCode?: number;
    constructor(options: RouteOptions) {
        this.path = options.path;
        this.method = options.method || "GET";
        if (options.errorCode) this.errorCode = options.errorCode;
        if (options.handle) this.handle = options.handle;
    };
    
    handle(handleDTO: InterceptOptions): Promise<Response> | Response {
        throw new Error("Not implemented");
    }
}

export default Route;