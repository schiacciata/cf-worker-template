import { Model } from "@/core/Model";
import { DB, UsersTable } from "@/types/db";

class UserModel extends Model<UsersTable> {
	constructor(db: DB) {
		super({
			db,
			table: 'users',
		})
	}

	async findByCredentials(username: string, password: string) {
		return await this.db
			.selectFrom(this.table)
			.selectAll()
			.where('username', '=', username)
			.where('password', '=', password)
			.executeTakeFirst();
	};
};

export default UserModel;
