import Configuration from "./core/Configuration";
import { Env } from "./types/Env";

export class Config extends Configuration {
    constructor() {
        super({/* base config here */});
    };

    public setUp(env: Env): void {
        this.config.debug = env.env !== "PRODUCTION";
    };
  }

export default new Config();