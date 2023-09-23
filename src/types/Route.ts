import Path from "../core/Path";
import { InterceptOptions } from "./Router";
import { User } from "./db";

export type HTTPMethod = "GET" | "HEAD" | "POST" | "PUT" | "DELETE" | "CONNECT" | "OPTIONS" | "TRACE" | "PATCH";

export type RouteHandleOptions = InterceptOptions & {
    user?: User;
}

export interface IRoute {
    path: Path,
    method: HTTPMethod,
    errorCode?: number,
    auth: boolean,
    fetchUserFromDB: boolean,
    adminOnly: boolean,
    handle: (handleDTO: InterceptOptions) => Promise<Response> | Response,
}

export type RouteOptions = {
    path: Path,
    method?: HTTPMethod,
    errorCode?: number,
    auth?: boolean,
    fetchUserFromDB?: boolean,
    adminOnly?: boolean,
    handle?: (handleDTO: InterceptOptions) => Promise<Response> | Response,
}