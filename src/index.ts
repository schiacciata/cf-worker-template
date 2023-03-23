import config from "./config";
import Router from "./core/Router";
import RoutesHandler from "./handlers/routes";
import { ServerErrorRoute } from "./routes/500";
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

		const interceptParams = {
			request,
			env,
			context: ctx,
			config: config.getConfig(),
		};

		try {
			return await router.intercept(interceptParams);
		} catch (error) {
			const errorRoute: ServerErrorRoute | undefined = await router.getErrorRoute(500);
			if (!errorRoute) return new Response('An error happened: ' + error, {
				status: 500,
			});

			return await errorRoute.handle(interceptParams);
		};
	},
};
