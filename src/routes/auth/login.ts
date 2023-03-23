import { User } from "../../types/Config";
import { RouteHandleOptions } from "../../types/Route";
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
        } catch (error) {
            return this.error('Invalid body');
        };

        let jwt: string | undefined;
        
        try {
            jwt = await handleDTO.authenticator.login<User>({
                payload: {
                    username: body.username,
                    password: body.password,
                }
            });
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