import * as z from "zod";

const SignUpSchema = z.object({
    name: z.string()
        .min(3, { message: "Name must be at-least 3 characters" })
        .max(20, { message: "Name cannot exceed 20 characters" }),
    email: z.string().email("Invalid email address"),
    password: z.string()
        .min(8, { message: "Password must be at-least 8 characters" })
        .max(20, { message: "Password cannot exceed 20 characters" }),
});

type SignupInterface = z.Infer<typeof SignUpSchema>

export { SignUpSchema }
export type { SignupInterface }