import { TConfig } from "../types/Config";
import { Env } from "../types/Env";

abstract class Configuration {
    protected config: TConfig;
  
    constructor(baseConfig: TConfig) {
      this.config = baseConfig;
    }
  
    public abstract setUp(env: Env): void;

    public getConfig(): TConfig {
      return this.config;
    };

    public print() {
      return Object.entries(this.config)
        .map(([key, value]) => {
          let str = `config.${key} = {{value}} (${typeof value})`;

          if (typeof value !== "object") return str.replace('{{value}}', value.toString());
          return str.replace('{{value}}', JSON.stringify(value));
        });
    }
}
  

export default Configuration;