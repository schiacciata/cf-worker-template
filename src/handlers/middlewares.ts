import Middleware from "@/core/Middleware";
import Handler from "@/core/Handler";

class MiddlewaresHandler extends Handler {
    constructor() {
        super({
            name: 'Middlewares',
        });
    };
    
    private isMiddleware(module?: NodeModule) {
        if (!module || !module.exports) return false;
        return !!module.exports.middleware && module.exports.middleware instanceof Middleware;
    }

    handle(): Middleware[] {
        return Object.values(require.cache)
		    .filter((module) => this.isModule(module) && this.isMiddleware(module))
		    .map((module) => {
                if (!module) return new Middleware();

                return module.exports.middleware as Middleware;
            });
    }
};

export default MiddlewaresHandler;