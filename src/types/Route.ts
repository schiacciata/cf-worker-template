import Path from "../core/Path";
import { InterceptOptions } from "./Router";

export type HTTPMethod = "GET" | "HEAD" | "POST" | "PUT" | "DELETE" | "CONNECT" | "OPTIONS" | "TRACE" | "PATCH";

export type RouteHandleOptions = InterceptOptions & {}

export type RouteOptions = {
    path: Path,
    method?: HTTPMethod,
    errorCode?: number,
    auth?: boolean,
    handle?: (handleDTO: InterceptOptions) => Promise<Response> | Response,
}