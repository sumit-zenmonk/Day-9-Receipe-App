import * as z from "zod";

const LoginSchema = z.object({
    email: z.email().min(1).max(50),
    password: z.string().min(1).max(20),
});

type LoginInterface = z.Infer<typeof LoginSchema>

export { LoginSchema }
export type { LoginInterface }
