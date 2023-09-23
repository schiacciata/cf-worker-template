import { Insertable } from "kysely";
import { DB, Database, Table, TableKeys } from "@/types/db";
import { IModel, ModelOptions } from "@/types/Model";
import { InsertObjectOrList } from "kysely/dist/cjs/parser/insert-values-parser";

export abstract class Model<E extends Table> implements IModel<E> {
    protected db: DB
    readonly table: TableKeys;
    constructor(opts: ModelOptions) {
        this.db = opts.db;
        this.table = opts.table;
    }

    async find(id: number) {
        return await this.db
            .selectFrom(this.table)
            .selectAll()
            .where('id', '=', id)
            .executeTakeFirst();
    }

    async list(limit?: number, offset?: number) {
        let query = await this.db
            .selectFrom(this.table)
            .selectAll();

        if (limit) query = query.limit(limit);
        if (offset) query = query.offset(offset);
        
        return await query.execute();
    }

    async insert(entity: InsertObjectOrList<Database, TableKeys>) {
        return await this.db
            .insertInto(this.table)
            .values(entity)
            .executeTakeFirst();
    }

    async update(id: number, newData: Insertable<E>) {
        return await this.db
            .updateTable(this.table)
            .where('id', '=', id)
            .set(newData)
            .executeTakeFirst();
    }

    async delete(id: number) {
        return await this.db
            .deleteFrom(this.table)
            .where('id', '=', id)
            .executeTakeFirst();
    }
}