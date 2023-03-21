import Path from "../../core/Path";
import Route from "../../core/Route";
import { RouteHandleOptions } from "../../types/Route";

abstract class AuthBaseRoute extends Route {
    constructor(path: string) {
        super({
            path: new Path().setUp("/auth" + path),
            method: 'POST',
        });
    };

    async handle(handleDTO: RouteHandleOptions): Promise<Response> {
        throw new Error("Not implemented");
    }
}

export default AuthBaseRoute;