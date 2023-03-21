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

    public randomString(length: number): string {
      let result = '';
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      const charactersLength = characters.length;
      for (let i = 0; i < length; i++) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      return result;
  };
  }
  

export default Configuration;