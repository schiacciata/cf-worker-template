import Route from "@/core/Route";
import { HTTPMethod, RouteHandleOptions } from "@/types/Route";
import { RouterOptions } from "@/types/Router";
import NotFoundError from "@/errors/notfound";
import Middleware from "./Middleware";
import ServerError from "@/errors/server";
import { ServerErrorRoute } from "@/routes/error/500";

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

    async intercept(interceptOptions: RouteHandleOptions): Promise<Response> {
        const route = this.getRoute(interceptOptions.request);
        if (!route) {
            const notFound = this.getErrorRoute(404);
            if (notFound) return notFound.handle(interceptOptions);

            return new NotFoundError("Route not found").toResponse();
        };

        interceptOptions.logger.log('Found route', route);

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

        try {
            const response = await route.handle(interceptOptions);
            interceptOptions.logger.success('Successfully handled route', route);
            
            return response;
        } catch (error) {
            interceptOptions.logger.error('Error handling route', route);

            const errorRoute: ServerErrorRoute | undefined = await this.getErrorRoute(500);
			if (!errorRoute) return new ServerError(error as Error, interceptOptions.config.debug).toResponse();

			return await errorRoute.handle({
				...interceptOptions,
				error,
			});
        };
    }
}

export default Router;