import Path from "@/core/Path";
import Route from "@/core/Route";
import { HTTPMethod } from "@/types/Route";

abstract class AdminBaseRoute extends Route {
    constructor(method: HTTPMethod, path?: string) {
        super({
            path: new Path().setUp('/admin'+path),
            method,
			auth: true,
            adminOnly: true,
        });
    };
}

export default AdminBaseRoute;