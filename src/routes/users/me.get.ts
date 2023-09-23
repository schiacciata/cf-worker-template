import { RouteHandleOptions } from "@/types/Route";
import UsersBaseRoute from "./users.base";
import { db } from "@/core/db";
import UserModel from "@/models/user";

class UsersMeRoute extends UsersBaseRoute {
    constructor() {
        super('GET', '/me');
    };

    async handle(handleDTO: RouteHandleOptions): Promise<Response> {
		const token = handleDTO.authenticator.getTokenFromRequest(handleDTO.request);
        if (!token) return this.error('Token not provided', 400);

        let payload;
        try {
            payload = handleDTO.authenticator.getPayload(token);
        } catch (error) {
            return this.error('Could not decode payload', 400)
        }
        if (!payload) return this.error('No token payload found', 400);

        const user = await new UserModel(db(handleDTO.env))
            .find(payload.id);

        if (!user) return this.error("User not found", 404);
        
        return Response.json(user);
    }
}

export const route = new UsersMeRoute();