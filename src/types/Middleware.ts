import Route from "@/core/Route";
import { RouteHandleOptions } from "./Route";

export interface IMiddleware {
    handle(middlewareDTO: MiddlewareHandleOptions): Promise<Response | undefined>;
}

export type MiddlewareHandleOptions = {
    route: Route,
    interceptOptions: RouteHandleOptions,
}