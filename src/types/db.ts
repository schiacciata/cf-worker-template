import { ColumnType, Generated, Insertable, Kysely, Selectable, Updateable } from 'kysely'

export interface Database {
  users: UsersTable,
}

export type DB = Kysely<Database>;
export type TableKeys = keyof Database;
export type Table = Database[TableKeys];

export interface UsersTable {
  id: Generated<number>;
  username: string;
  password: string;
  admin: boolean;
  created_at: ColumnType<Date, string | undefined, never>;
}