import Route from "@/core/Route";
import { InterceptOptions } from "./Router";

export interface IMiddleware {
    handle(middlewareDTO: MiddlewareHandleOptions): Promise<Response | undefined>;
}

export type MiddlewareHandleOptions = {
    route: Route,
    interceptOptions: InterceptOptions,
}