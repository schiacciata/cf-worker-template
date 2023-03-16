import { TConfig } from "../types/Config";
import { Env } from "../types/Env";

abstract class Configuration {
    protected config: TConfig;
  
    constructor(baseConfig: TConfig) {
      this.config = baseConfig;
    }
  
    public abstract setUp(env: Env): void;
  }
  

export default Configuration;