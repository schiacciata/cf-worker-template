export interface IError {
    readonly status: number;
    getMessages(): string[]
    toResponse(): Response;
};

export type ErrorOptions<T extends Error> = {
    error: T;
    status?: number;
}