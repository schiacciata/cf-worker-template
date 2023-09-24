import Middleware from "@/core/Middleware";
import { db } from "@/core/db";
import ApiError from "@/errors/api";
import AuthenticationError from "@/errors/authentication";
import UserModel from "@/models/user";
import { MiddlewareHandleOptions } from "@/types/Middleware";
import { InterceptOptions } from "@/types/Router";

export class UserMiddleware extends Middleware {
    async handle({ route, interceptOptions }: MiddlewareHandleOptions): Promise<Response | undefined> {
      if (!route.fetchUserFromDB && !route.adminOnly) return;

      const data = await this.getUserFromRequest(interceptOptions);
      if (data instanceof ApiError) {
        return data.toResponse();
      }

      interceptOptions.user = data;

      if (route.adminOnly && !data.admin) {
        return new AuthenticationError().toResponse();
      };

      return;
    }
  
    private async getUserFromRequest(options: InterceptOptions) {
      const token = options.authenticator.getTokenFromRequest(options.request);
      if (!token) return new ApiError('Token not provided');
  
      const payload = options.authenticator.getPayload(token);
      if (!payload) return new ApiError('No token payload found');
  
      const user = await new UserModel(db(options.env)).find(payload.id);
  
      if (!user) return new ApiError("User not found", 401);
      return user;
    }
}

export const middleware = new UserMiddleware();