import Path from "@/core/Path";
import Route from "@/core/Route";
import { HTTPMethod } from "@/types/Route";

abstract class UsersBaseRoute extends Route {
    constructor(method: HTTPMethod, path?: string) {
        super({
            path: path ? new Path().setUp('/users'+path) : new Path(/^\/users\/(?<id>[^/]+)$/),
            method,
			auth: true,
        });
    };
}

export default UsersBaseRoute;