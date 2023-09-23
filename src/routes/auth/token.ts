import { RouteHandleOptions } from "@/types/Route";
import AuthBaseRoute from "./auth.base";

class AuthTokenRoute extends AuthBaseRoute {
    constructor() {
        super('/token');
        this.auth = true;
    }

    async handle(handleDTO: RouteHandleOptions): Promise<Response> {
        const token = handleDTO.authenticator.getTokenFromRequest(handleDTO.request);
        if (!token) return this.error('No token');

        let payload;
        try {
            payload = handleDTO.authenticator.getPayload(token);
        } catch (error) {
            return this.error('Could not decode payload')
        }
        if (!payload) return this.error('No token payload found');
        return Response.json({
            ...payload,
            expiration: new Date(Math.floor(payload.exp * 1000)).toUTCString(),
        });
    }
}

export const route = new AuthTokenRoute();