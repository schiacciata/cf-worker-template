import { Env } from "@/types/Env";
import { Database } from "@/types/db";
import { Kysely } from "kysely";
import { D1Dialect } from "kysely-d1";

export const db = (env: Env) => {
    if (!env.DB) throw new Error('DB variable missing from env');
    return new Kysely<Database>({ dialect: new D1Dialect({ database: env.DB }) });
};