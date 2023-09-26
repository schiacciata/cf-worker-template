import Configuration from "@/core/Configuration";
import utils from "@/core/Utils";
import { Env } from "@/types/Env";

export class Config extends Configuration {
    constructor() {
        //Base/Static config
        super({
            JWTSecret: '',
            JWTExpirationInS: 7200,
            debug: false,
        });

        this.config.JWTSecret = utils.randomString(100);
    };

    public setUp(env: Env): void {
        this.config.debug = env.env !== "PRODUCTION";
        this.config.JWTSecret = env.JWTsecret;
    };
  }

export default new Config();