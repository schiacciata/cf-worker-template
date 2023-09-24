import Middleware from "@/core/Middleware";
import AuthenticationError from "@/errors/authentication";
import { MiddlewareHandleOptions } from "@/types/Middleware";

export class AuthenticationMiddleware extends Middleware {
    async handle({ route, interceptOptions }: MiddlewareHandleOptions): Promise<Response | undefined> {
      if (!route.auth) return;
  
      if (!(await interceptOptions.authenticator.isAuthenticated(interceptOptions))) {
        return new AuthenticationError().toResponse();
      }
      
      return;
    }
};

export const middleware = new AuthenticationMiddleware();