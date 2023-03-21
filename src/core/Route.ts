import { RouteOptions, HTTPMethod, RouteHandleOptions } from "../types/Route";
import Path from "./Path";

abstract class Route {
    path: Path;
    method: HTTPMethod;
    errorCode?: number;
    auth?: boolean;
    constructor(options: RouteOptions) {
        this.path = options.path;
        this.method = options.method || "GET";
        if (options.errorCode) this.errorCode = options.errorCode;
        if (options.handle) this.handle = options.handle;
        if (options.auth) this.auth = options.auth;
    };
    
    handle(handleDTO: RouteHandleOptions): Promise<Response> | Response {
        throw new Error("Not implemented");
    }

    error(message: string, status: number = 400): Response {
        return Response.json({
            error: message,
            code: status
        }, { status })
    }
}

export default Route;