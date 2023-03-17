import { StorageEnv } from "@schiacciata/cf-workers-storage";

export interface Env extends StorageEnv {
    ENV: "PRODUCTION" | "DEVELOPMENT";
	MY_KV_STORAGE: KVNamespace;
	CUSTOM_KV: KVNamespace;
};