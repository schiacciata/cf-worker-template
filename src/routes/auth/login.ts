import { Payload } from "@schiacciata/cf-workers-auth/src/types/BearerAuthenticator";
import { RouteHandleOptions } from "@/types/Route";
import AuthBaseRoute from "./auth.base";
import { db } from "@/core/db";
import UserModel from "@/models/user";
import { loginPostBody, loginSchema } from "@/schemas/login";

class LoginRoute extends AuthBaseRoute {
    constructor() {
        super('/login');
        this.method = 'POST';
        this.bodyValidationSchema = loginSchema;
    }

    async handle(handleDTO: RouteHandleOptions): Promise<Response> {
        const body = handleDTO.validatedBody as loginPostBody;

        const user = await new UserModel(db(handleDTO.env))
            .findByCredentials(body.username, body.password);

        if (!user) return this.error("Invalid credentials");

        let jwt: string | undefined;
        
        const payload: Payload & Record<string, any> = {
            username: user.username,
            id: user.id,
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