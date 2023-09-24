import ApiError from "@/errors/api";
import { RouteOptions, HTTPMethod, RouteHandleOptions, IRoute } from "../types/Route";
import Path from "./Path";

class Route implements IRoute {
    path: Path;
    method: HTTPMethod;
    errorCode?: number;
    auth: boolean;
    fetchUserFromDB: boolean;
    adminOnly: boolean;
    constructor(options: RouteOptions) {
        this.path = options.path;
        this.method = options.method || "GET";
        if (options.errorCode) this.errorCode = options.errorCode;
        if (options.handle) this.handle = options.handle;

        this.auth = options.auth || false;
        this.fetchUserFromDB = options.fetchUserFromDB || false;
        this.adminOnly = options.adminOnly || false;
    };
    
    handle(handleDTO: RouteHandleOptions): Promise<Response> | Response {
        throw new Error("Not implemented");
    }

    error(message: string, status: number = 400): Response {
        return new ApiError(message, status).toResponse();
    }
}

export default Route;