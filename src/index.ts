import { Logger } from "@schiacciata/logger/index";
import config from "./config";
import Router from "./core/Router";
import RoutesHandler from "./handlers/routes";
import { Env } from "./types/Env";
import { BearerAuthenticator } from "@schiacciata/cf-workers-auth";
import MiddlewaresHandler from "./handlers/middlewares";

const router = new Router({})
	.init(new RoutesHandler().handle())
	.use(new MiddlewaresHandler().handle());

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
		logger.options.isEnabled = configuration.debug;

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

		return await router.intercept(interceptParams);
	},
};
