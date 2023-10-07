import { HandlerOptions } from "../types/Handler";

abstract class Handler {
    name: string;
    constructor(options: HandlerOptions) {
        this.name = options.name;
        if (options.handle) this.handle = options.handle;
    }

    handle(): any | Promise<any> {
        throw new Error("Method not implemented");
    }

    private isModule (module?: NodeModule): module is NodeModule {
        if (!module || !module.exports || !module.loaded) return false;
        return Object.prototype.toString.call(module.exports) === '[object Module]';
    }

    getModules(): NodeModule[] {
        const cache = Object.values(require.cache);
        const modules = cache.filter((m): m is NodeModule => this.isModule(m));
        return modules;
    }    
}

export default Handler;