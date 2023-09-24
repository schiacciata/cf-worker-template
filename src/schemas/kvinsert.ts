import { z } from "zod";

export const kvInsertSchema = z.object({
    value: z
        .string({ required_error: 'field "value" is required' })
        .min(1, { message: 'field "value" cannot be empty' }),
});

export type kvInsertBody = z.infer<typeof kvInsertSchema>;