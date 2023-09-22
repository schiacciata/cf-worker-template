import { Logger } from "@schiacciata/logger/index";
import config from "./config";
import Router from "./core/Router";
import RoutesHandler from "./handlers/routes";
import { Env } from "./types/Env";

const router = new Router({})
	.init(new RoutesHandler().handle());

const logger = new Logger({
	date: false,
	symbols: false,
	text: true,
});

export default {
	async fetch(
		request: Request,
		env: Env,
		ctx: ExecutionContext
	): Promise<Response> {
		config.setUp(env);
		config.print()
			.forEach((s) => logger.debug(s));
		
		const configuration = config.getConfig();
		logger.options.isEnabled = configuration.debug || false;

		const interceptParams = {
			request,
			env,
			context: ctx,
			config: configuration,
			logger,
		};

		try {
			return await router.intercept(interceptParams);
		} catch (error) {
			const errorRoute = await router.getErrorRoute(500);
			if (!errorRoute) return new Response('An error happened: ' + error, {
				status: 500,
			});

			return await errorRoute.handle({
				...interceptParams,
				error,
			});
		};
	},
};
