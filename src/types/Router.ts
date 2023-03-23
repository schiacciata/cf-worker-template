import Route from "../core/Route"
import { Env } from "./Env"
import { TConfig } from "./Config"
import { Logger } from "@schiacciata/logger/index"

export type RouterOptions = {
    routes?: Route[],
}

export type InterceptOptions = {
    request: Request,
    env: Env,
    context: ExecutionContext,
    config: TConfig,
    logger: Logger
}