import Configuration from "./core/Configuration";
import { Env } from "./types/Env";

export class Config extends Configuration {
    constructor() {
        //Base/Static config
        super({
            users: [
                {
                    username: 'admin',
                    password: 'admin',
                }
            ],
            JWTSecret: '',
            JWTExpirationInS: 7200,
        });

        this.config.JWTSecret = this.randomString(100);
    };

    public setUp(env: Env): void {
        this.config.debug = env.env !== "PRODUCTION";
        this.config.JWTSecret = env.JWTsecret;
    };
  }

export default new Config();