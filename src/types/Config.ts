export type TConfig = {
    JWTSecret: string;
    debug?: boolean,
    users: User[];
};

export type User = {
    username: string;
    password: string;
}