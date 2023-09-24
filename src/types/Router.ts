import Route from "@/core/Route"
import { Env } from "./Env"
import { TConfig } from "./Config"
import { Logger } from "@schiacciata/logger/index"
import { BearerAuthenticator } from "@schiacciata/cf-workers-auth"
import { User } from "./db"
import Middleware from "@/core/Middleware"

export type RouterOptions = {
    routes?: Route[],
    middlewares?: Middleware[],
}

export type InterceptOptions = {
    request: Request,
    env: Env,
    context: ExecutionContext,
    config: TConfig,
    logger: Logger,
    authenticator: BearerAuthenticator;
    user?: User;
}