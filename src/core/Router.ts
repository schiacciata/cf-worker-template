import Route from "../core/Route";
import { InterceptOptions, RouterOptions } from "../types/Router";

class Router {
    routes: Route[];
    constructor(options: RouterOptions) {
        this.routes = options.routes || [];
    };

    init(routes: Route[]) {
        this.routes = routes;
        return this;
    };

    private getRoute(request: Request): Route | undefined {
        return this.routes.find(route => route.path.test(request) && route.method === request.method);
    }

    async intercept(options: InterceptOptions): Promise<Response> {
        const route = this.getRoute(options.request);
        if (!route) {
            const notFound = this.routes.find(r => r.errorCode === 404);
            if (notFound) return notFound.handle(options);

            return new Response("Route not found");
        }
        return await route.handle(options);
    }
}

export default Router;