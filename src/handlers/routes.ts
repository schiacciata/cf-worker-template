import Handler from "../core/Handler";
import Path from "../core/Path";
import Route from "../core/Route";

class RoutesHandler extends Handler {
    constructor() {
        super({
            name: 'Routes',
        });
    };
    
    private isRoute(module?: NodeModule) {
        if (!module || !module.exports) return false;
        return !!module.exports.route && module.exports.route instanceof Route;
    }

    handle(): Route[] {
        return Object.values(require.cache)
		    .filter((module) => this.isModule(module) && this.isRoute(module))
		    .map((module) => {
                if (!module) return new Route({ path: new Path()});

                const data: Route = module.exports.route; 
                return data;
            });
    }
};

export default RoutesHandler;