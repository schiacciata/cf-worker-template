import UserModel from "@/models/user";
import Route from "@/core/Route";
import { HTTPMethod } from "@/types/Route";
import { InterceptOptions, RouterOptions } from "@/types/Router";
import { db } from "./db";
import ApiError from "@/errors/api";
import NotFoundError from "@/errors/notfound";
import Middleware from "./Middleware";

class Router {
    private middlewares: Middleware[];
    private routes: Route[];
    constructor(options: RouterOptions) {
        this.routes = options.routes || [];
        this.middlewares = options.middlewares || [];
    };

    init(routes: Route[]) {
        this.routes = routes;
        return this;
    };
    
    use(middleware: Middleware | Middleware[]) {
        if (Array.isArray(middleware)) {
            this.middlewares.push(...middleware);
        } else {
            this.middlewares.push(middleware);
        }
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

    private async getUserFromRequest(interceptOptions: InterceptOptions) {
        const token = interceptOptions.authenticator.getTokenFromRequest(interceptOptions.request);
        if (!token) return new ApiError('Token not provided');

        const payload = interceptOptions.authenticator.getPayload(token);
        if (!payload) return new ApiError('No token payload found');

        const user = await new UserModel(db(interceptOptions.env))
            .find(payload.id);

        if (!user) return new ApiError("User not found", 401);
        return user;
    }

    async intercept(interceptOptions: InterceptOptions): Promise<Response> {
        const route = this.getRoute(interceptOptions.request);
        if (!route) {
            const notFound = this.getErrorRoute(404);
            if (notFound) return notFound.handle(interceptOptions);

            return new NotFoundError("Route not found").toResponse();
        };

        interceptOptions.logger.success('Found route', route);

        for (const middleware of this.middlewares) {
            interceptOptions.logger.info('Executing middleware', middleware);

            const response = await middleware.handle({
                route,
                interceptOptions,
            });

            if (response) {
              return response; 
            };
        };
        
        return await route.handle(interceptOptions);
    }
}

export default Router;