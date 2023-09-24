import { RouteHandleOptions } from "@/types/Route";
import AdminBaseRoute from "./admin.base";

class ConfigRoute extends AdminBaseRoute {
    constructor() {
        super('GET', '/debug');
    };

    async handle(handleDTO: RouteHandleOptions): Promise<Response> {
        return Response.json({
            enabled: handleDTO.config.debug || false,
        });
    }
}

export const route = new ConfigRoute();