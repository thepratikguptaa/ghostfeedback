import { z } from "zod";

export const messageSchema = z.object({
    content: z
    .string()
    .min(10, {message: "Message must be atleast 50 characters long"})
    .max(500, {message: "Message must be atmost 500 characters long"})
})