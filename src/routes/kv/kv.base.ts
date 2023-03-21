import { KVManager } from "@schiacciata/cf-workers-storage";
import Path from "../../core/Path";
import Route from "../../core/Route";
import { HTTPMethod } from "../../types/Route";
import { RouteHandleOptions } from "../../types/Route";

abstract class KVBaseRoute extends Route {
	kvName: string;
	kvStorage?: KVManager;
    constructor(method: HTTPMethod) {
        super({
            path: new Path(/^\/kv\/(?<key>[^/]+)$/),
            method,
			auth: true,
        });

		this.kvName = "MY_KV_STORAGE";
    };

	public setUpKV(handleDTO: RouteHandleOptions) {
		this.kvStorage = new KVManager({
			context: handleDTO.context,
			env: handleDTO.env,
			kvName: this.kvName,
			debug: handleDTO.config.debug,
		});

		return !!this.kvStorage;
	}

    async handle(handleDTO: RouteHandleOptions): Promise<Response> {
        throw new Error("Not implemented");
    }
}

export default KVBaseRoute;