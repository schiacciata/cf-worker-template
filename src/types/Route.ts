import Path from "../core/Path";
import { InterceptOptions } from "./Router";

export type HTTPMethod = "GET" | "HEAD" | "POST" | "PUT" | "DELETE" | "CONNECT" | "OPTIONS" | "TRACE" | "PATCH";

export type RouteOptions = {
    path: Path,
    method?: HTTPMethod,
    errorCode?: number,
    handle?: (handleDTO: InterceptOptions) => Promise<Response> | Response,
}