import { KVManager } from "@schiacciata/cf-workers-storage";
import Path from "../core/Path";
import Route from "../core/Route";
import { InterceptOptions } from "../types/Router";

class KVRoute extends Route {
	kvName: string;
	kvStorage?: KVManager;
    constructor() {
        super({
            path: new Path().setUp("/kv(.*)"),
            method: "GET"
        });

		this.kvName = "MY_KV_STORAGE";
    };

	private setUpKV(handleDTO: InterceptOptions) {
		this.kvStorage = new KVManager({
			context: handleDTO.context,
			env: handleDTO.env,
			kvName: this.kvName,
			debug: handleDTO.config.debug,
		});

		return !!this.kvStorage;
	}

    async handle(handleDTO: InterceptOptions): Promise<Response> {
		this.setUpKV(handleDTO);
		if (!this.kvStorage) return new Response("Could not setup kv", {
			status: 500,
		});

		const newKV  = 'CUSTOM_KV';
		const key = handleDTO.request.url;

		const result = await this.kvStorage.get({
			key,
			kvName: newKV
		});
		if (result) return new Response(`Key ${key} has value ${result}`);

		const value = handleDTO.request.method;
		this.kvStorage.set({
			key,
			kvName: newKV,
			value,
		});

		return new Response(`Saved value ${value} for key ${key} in kv ${newKV}`);
    }
}

export const route = new KVRoute();