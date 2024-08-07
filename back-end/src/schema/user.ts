import zod from "zod";

const registerSchema = zod.object({
    username: zod.string()
        .min(2, { message: "Username must be 2-40 characters." })
        .max(40, { message: "Username must be 2-40 characters." }),
    password: zod.string()
        .min(8, { message: "Password must be 8-12 characters." })
        .max(12, { message: "Password must be 8-12 characters." }),
    confirmPassword: zod.string(),
}).refine((arg) => arg.password == arg.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"]
})

const loginSchema = zod.object({
    username: zod.string().min(2).max(40),
    password: zod.string().min(8).max(12),
})


export { registerSchema, loginSchema };
