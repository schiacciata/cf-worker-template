import Route from "../core/Route"
import { Env } from "./Env"
import { TConfig } from "./Config"

export type RouterOptions = {
    routes?: Route[],
}

export type InterceptOptions = {
    request: Request,
    env: Env,
    context: ExecutionContext,
    config: TConfig,
}