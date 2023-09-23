export interface Env extends Record<string, any> {
    ENV: "PRODUCTION" | "DEVELOPMENT";
	MY_KV_STORAGE: KVNamespace;
	CUSTOM_KV: KVNamespace;
	JWTsecret: string;
	DB: D1Database;
};