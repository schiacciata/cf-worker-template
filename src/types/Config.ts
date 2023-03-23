export type TConfig = {
    JWTSecret: string;
    debug?: boolean,
    users: User[];
    JWTExpirationInS: number;
};

export type User = {
    username: string;
    password: string;
}