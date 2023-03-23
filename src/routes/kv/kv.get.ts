import { RouteHandleOptions } from "../../types/Route";
import KVBaseRoute from "./kv.base";

class KVGetRoute extends KVBaseRoute {
    constructor() {
        super("GET");
    };

    async handle(handleDTO: RouteHandleOptions): Promise<Response> {
		this.setUpKV(handleDTO);
		if (!this.kvStorage) return this.error("Could not setup kv", 500);

		const { key } = this.path.params;
		const result = await this.kvStorage.get({
			key,
			//kvName: newKV
		});
		
		if (!result) return new Response(`Data in KV with key ${key} not found`, {
            status: 404,
        });
        return new Response(`Key ${key} has value ${result}`);
    }
}

export const route = new KVGetRoute();