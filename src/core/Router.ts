import { BearerAuthenticator } from "@schiacciata/cf-workers-auth";
import Route from "../core/Route";
import { HTTPMethod } from "../types/Route";
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
        const { pathname } = new URL(request.url);

        const filteredRoutes = this.routes
            .filter(route => route.method === request.method);

        const slugMatch = filteredRoutes.find(route => route.path.slug === pathname);
        if (slugMatch) return slugMatch;
    
        return filteredRoutes.find(route => route.path.test(pathname));
    };

    public getErrorRoute(errorCode: number, matchMethod?: HTTPMethod) {
        const condition = (r: Route): boolean => {
            if (matchMethod && r.method !== matchMethod) return false;
            return r.errorCode === errorCode;
        };
        
        return this.routes.find(condition);
    }

    async intercept(interceptOptions: InterceptOptions): Promise<Response> {
        const route = this.getRoute(interceptOptions.request);
        if (!route) {
            const notFound = this.getErrorRoute(404);
            if (notFound) return notFound.handle(interceptOptions);

            return new Response("Route not found");
        };

        if (!route.auth) return await route.handle(interceptOptions);

        if (!await interceptOptions.authenticator.isAuthenticated(interceptOptions)) return new Response("You're not authorized", {
            status: 401,
        });

        return await route.handle(interceptOptions);
    }
}

export default Router;