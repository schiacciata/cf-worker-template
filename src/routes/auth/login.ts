import { Payload } from "@schiacciata/cf-workers-auth/src/types/BearerAuthenticator";
import { User } from "@/types/Config";
import { RouteHandleOptions } from "@/types/Route";
import AuthBaseRoute from "./auth.base";

type LoginPost = {
    username?: string;
    password?: string;
}

class LoginRoute extends AuthBaseRoute {
    constructor() {
        super('/login');
    }

    async handle(handleDTO: RouteHandleOptions): Promise<Response> {
        if (!handleDTO.authenticator) return this.error('Authenticator not setup', 500);
        
        let body: LoginPost;
        try {
            body = await handleDTO.request.json();
            if (!body.username || !body.password) return this.error('Missing username or password');

            if (!handleDTO.config.users.find((u) => u.username == body.username && u.password == body.password)) return this.error("Invalid credentials");
        } catch (error) {
            return this.error('Invalid body');
        };

        let jwt: string | undefined;
        
        const payload: Payload & { username: string; } = {
            username: body.username,
        };

        if (handleDTO.config.JWTExpirationInS) {
            const now = Math.floor(Date.now() / 1000);
            const timeFromNow = now + handleDTO.config.JWTExpirationInS;

            handleDTO.logger.info(`The token will expire at`, new Date(timeFromNow*1000).toLocaleString());
            payload.exp = timeFromNow;
        };

        try {
            jwt = await handleDTO.authenticator.sign(payload);
        } catch (error) {
            return this.error('Error logging in: ' + error, 400)
        }
        
        if (!jwt) {
            return this.error('Unauthorized', 401 );
        };

        handleDTO.logger.success(`User "${body.username}" logged in!`);
        return Response.json({ token: jwt });
    }
}

export const route = new LoginRoute();