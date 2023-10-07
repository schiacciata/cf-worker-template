import Middleware from "@/core/Middleware";
import Handler from "@/core/Handler";

class MiddlewaresHandler extends Handler {
    constructor() {
        super({
            name: 'Middlewares',
        });
    };
    
    private isMiddleware(module: NodeModule) {
        const { middleware } = module.exports;
        return !!middleware && middleware instanceof Middleware;
    }

    handle(): Middleware[] {
        return this
            .getModules()
            .filter((m) => this.isMiddleware(m))
            .map(({ exports }) => exports.middleware);
    }
};

export default MiddlewaresHandler;