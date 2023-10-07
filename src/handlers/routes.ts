import Handler from "../core/Handler";
import Route from "../core/Route";

class RoutesHandler extends Handler {
    constructor() {
        super({
            name: 'Routes',
        });
    };
    
    private isRoute(module: NodeModule) {
        const { route } = module.exports;
        return !!route && route instanceof Route;
    }

    handle(): Route[] {
        return this
            .getModules()
		    .filter((module) => this.isRoute(module))
            .map(({ exports }) => exports.route);
    }
};

export default RoutesHandler;