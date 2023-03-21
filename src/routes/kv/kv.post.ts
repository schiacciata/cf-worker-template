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
		if (!this.kvStorage) return new Response("Could not setup kv", {
			status: 500,
		});

		const { key } = this.path.params;
		let data: PostBody = {};

		try {
			data = await handleDTO.request.json();
			if (!data.value) return new Response(`Please provide a value`, {
				status: 400,
			});
		} catch (error) {
			return new Response(`Please provide a valid body`, {
				status: 400,
			});
		}

		this.kvStorage.set({
			key,
			value: data.value,
		});

		return new Response(`Saved value ${data.value} for key ${key}`);
    }
}

export const route = new KVPostRoute();