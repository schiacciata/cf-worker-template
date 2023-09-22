import { BearerAuthenticator } from "@schiacciata/cf-workers-auth";
import Route from "../core/Route";
import { HTTPMethod } from "../types/Route";
import { InterceptOptions, RouterOptions } from "../types/Router";

class Router {
    routes: Route[];
    authenticator?: BearerAuthenticator;
    constructor(options: RouterOptions) {
        this.routes = options.routes || [];
    };

    init(routes: Route[]) {
        this.routes = routes;
        return this;
    };

    private getRoute(request: Request): Route | undefined {
        return this.routes.find(route => route.path.test(request) && route.method === request.method);
    };

    private setUpAuthenticator(handleDTO: InterceptOptions) {
		this.authenticator = new BearerAuthenticator({
			debug: handleDTO.config.debug,
            secret: handleDTO.config.JWTSecret,
		});

		return !!this.authenticator;
	};

    public getErrorRoute(errorCode: number, matchMethod?: HTTPMethod) {
        const condition = (r: Route): boolean => {
            if (matchMethod && r.method !== matchMethod) return false;
            return r.errorCode === errorCode;
        };
        
        return this.routes.find(condition);
    }

    async intercept(options: InterceptOptions): Promise<Response> {
        this.setUpAuthenticator(options);

        const route = this.getRoute(options.request);
        if (!route) {
            const notFound = this.getErrorRoute(404);
            if (notFound) return notFound.handle(options);

            return new Response("Route not found");
        };

        if (!route.auth) return await route.handle({
            ...options,
            authenticator: this.authenticator,
        });

        if (!await this.authenticator?.isAuthenticated(options)) return new Response("You're not authorized", {
            status: 401,
        });

        return await route.handle(options);
    }
}

export default Router;