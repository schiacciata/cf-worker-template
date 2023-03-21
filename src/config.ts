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
        });
    };

    public setUp(env: Env): void {
        this.config.debug = env.env !== "PRODUCTION";
        this.config.JWTSecret = env.JWTsecret || this.randomString(100);
    };
  }

export default new Config();