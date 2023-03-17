import { KVManager } from "@schiacciata/cf-workers-storage";
import Path from "../../core/Path";
import Route from "../../core/Route";
import { HTTPMethod } from "../../types/Route";
import { InterceptOptions } from "../../types/Router";

abstract class KVBaseRoute extends Route {
	kvName: string;
	kvStorage?: KVManager;
    constructor(method: HTTPMethod) {
        super({
            path: new Path().setUp("/kv(.*)"),
            method,
        });

		this.kvName = "MY_KV_STORAGE";
    };

	public setUpKV(handleDTO: InterceptOptions) {
		this.kvStorage = new KVManager({
			context: handleDTO.context,
			env: handleDTO.env,
			kvName: this.kvName,
			debug: handleDTO.config.debug,
		});

		return !!this.kvStorage;
	}

    async handle(handleDTO: InterceptOptions): Promise<Response> {
        throw new Error("Not implemented");
    }
}

export default KVBaseRoute;