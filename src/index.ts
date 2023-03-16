import config from "./config";
import Router from "./core/Router";
import RoutesHandler from "./handlers/routes";
import { Env } from "./types/Env";

const router = new Router({})
	.init(new RoutesHandler().handle());

export default {
	async fetch(
		request: Request,
		env: Env,
		ctx: ExecutionContext
	): Promise<Response> {
		config.setUp(env);

		return await router.intercept({
			request,
			env,
			context: ctx,
			config,
		});
	},
};
