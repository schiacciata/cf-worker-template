import { z } from "zod";

export const loginSchema = z.object({
    username: z.string({ required_error: 'field "username" is required' }).min(1, { message: 'field "username" cannot be empty' }),
    password: z.string({ required_error: 'field "password" is required' }).min(1, { message: 'field "password" cannot be empty' }),
});

export type loginPostBody = z.infer<typeof loginSchema>;