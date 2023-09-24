import { Logger } from "@schiacciata/logger/index";
import config from "./config";
import Router from "./core/Router";
import RoutesHandler from "./handlers/routes";
import { Env } from "./types/Env";
import { ServerErrorRoute } from "./routes/error/500";
import { BearerAuthenticator } from "@schiacciata/cf-workers-auth";
import ServerError from "./errors/server";

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

		const authenticator = new BearerAuthenticator({
			debug: configuration.debug,
			secret: configuration.JWTSecret,
		});

		const interceptParams = {
			request,
			env,
			context: ctx,
			config: configuration,
			logger,
			authenticator,
		};

		try {
			return await router.intercept(interceptParams);
		} catch (error) {
			const errorRoute: ServerErrorRoute | undefined = await router.getErrorRoute(500);
			if (!errorRoute) return new ServerError(error as Error, configuration.debug).toResponse();

			return await errorRoute.handle({
				...interceptParams,
				error,
			});
		};
	},
};
