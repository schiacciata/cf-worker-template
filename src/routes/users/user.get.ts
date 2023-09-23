import { RouteHandleOptions } from "@/types/Route";
import UsersBaseRoute from "./users.base";
import { db } from "@/core/db";
import UserModel from "@/models/user";

class UsersGetRoute extends UsersBaseRoute {
    constructor() {
        super('GET');
    };

    async handle(handleDTO: RouteHandleOptions): Promise<Response> {
        const { id } = this.path.params;

        const user = await new UserModel(db(handleDTO.env))
            .find(parseInt(id));
            
        if (!user) return this.error("User not found", 404);

        const { username, id: userId, created_at} = user;
        return Response.json({
            username,
            id: userId,
            created_at,
        });
    }
}

export const route = new UsersGetRoute();