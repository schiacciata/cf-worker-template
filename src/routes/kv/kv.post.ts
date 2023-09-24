import { kvInsertBody, kvInsertSchema } from "@/schemas/kvinsert";
import { RouteHandleOptions } from "../../types/Route";
import KVBaseRoute from "./kv.base";

class KVPostRoute extends KVBaseRoute {
    constructor() {
        super("POST");
		this.bodyValidationSchema = kvInsertSchema;
    };

    async handle(handleDTO: RouteHandleOptions): Promise<Response> {
		this.setUpKV(handleDTO);
		if (!this.kvStorage) return this.error("Could not setup kv", 500);

		const { key } = this.path.params;
		const body = handleDTO.validatedBody as kvInsertBody;

		this.kvStorage.set({
			key,
			value: body.value,
		});

		return new Response(`Saved value ${body.value} for key ${key}`);
    }
}

export const route = new KVPostRoute();