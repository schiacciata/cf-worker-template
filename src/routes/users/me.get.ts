import { RouteHandleOptions } from "@/types/Route";
import UsersBaseRoute from "./users.base";

class UsersMeRoute extends UsersBaseRoute {
    constructor() {
        super('GET', '/me');
        this.fetchUserFromDB = true;
    };

    async handle(handleDTO: RouteHandleOptions): Promise<Response> {
        if (!handleDTO.user) return this.error("Not logged in", 401);
        return Response.json(handleDTO.user);
    }
}

export const route = new UsersMeRoute();