import { Insertable, InsertResult, UpdateResult, DeleteResult } from "kysely";
import { DB, Database, Table, TableKeys } from "./db";
import { InsertObjectOrList } from "kysely/dist/cjs/parser/insert-values-parser";

export type ModelOptions = {
    db: DB;
    table: TableKeys;
}

export interface IModel<E extends Table> {
    find(id: number): Promise<any | undefined>;
    list(limit?: number, offset?: number): Promise<any[]>;
    insert(entity: InsertObjectOrList<Database, TableKeys>): Promise<InsertResult>;
    update(id: number, newData: Insertable<E>): Promise<UpdateResult>;
    delete(id: number): Promise<DeleteResult>;
}