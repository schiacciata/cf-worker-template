import Route from "../core/Route"
import Configuration from "../core/Configuration"
import { Env } from "./Env"

export type RouterOptions = {
    routes?: Route[],
}

export type InterceptOptions = {
    request: Request,
    env: Env,
    context: ExecutionContext,
    config: Configuration,
}