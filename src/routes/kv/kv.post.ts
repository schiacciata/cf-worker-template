import { RouteHandleOptions } from "../../types/Route";
import KVBaseRoute from "./kv.base";

type PostBody = {
	value?: string
}

class KVPostRoute extends KVBaseRoute {
    constructor() {
        super("POST");
    };

    async handle(handleDTO: RouteHandleOptions): Promise<Response> {
		this.setUpKV(handleDTO);
		if (!this.kvStorage) return this.error("Could not setup kv", 500);

		const { key } = this.path.params;
		let data: PostBody = {};

		try {
			data = await handleDTO.request.json();
			if (!data.value) return this.error(`Please provide a value`, 400);
		} catch (error) {
			return this.error(`Please provide a valid body`, 400);
		}

		this.kvStorage.set({
			key,
			value: data.value,
		});

		return new Response(`Saved value ${data.value} for key ${key}`);
    }
}

export const route = new KVPostRoute();