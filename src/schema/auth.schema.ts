import * as z from "zod"

export const registerSchema = z.object({
    name: z.string().nonempty("Name is Required").min(3, "Min Length is 3").max(50, "Max Length is 50"),

    email: z.string().nonempty("Email is Required").regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Email is not valid"),

    password: z.string().nonempty("Password is Required").regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{6,}$/, "Weak password"),

    rePassword: z.string().nonempty("Password is Required"),

    phone: z.string().nonempty("Phone Number is Required").regex(/^(010|011|012|015)[0-9]{8}$/, "Phone Number must be Egyptian")
}).refine((data) => data.password === data.rePassword,
    {
        path: ["rePassword"],
        message: "Passwords must match"
    }
)

export type registerSchemaType = z.infer<typeof registerSchema>

export const loginSchema = z.object({

    email: z.string().nonempty("Email is Required").regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Email is not valid"),

    password: z.string().nonempty("Password is Required").regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{6,}$/, "Weak password"),

})
export type loginSchemaType = z.infer<typeof loginSchema>

export const forgotPasswordSchema = z.object({
    email: z.string()
        .nonempty("Email is Required")
        .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Email is not valid"),
})

export type forgotPasswordType = z.infer<typeof forgotPasswordSchema>

export const verifyCodeSchema = z.object({
    resetCode: z.string()
        .nonempty("Reset Code is Required")
        .length(6, "Code must be exactly 6 digits")
        .regex(/^\d+$/, "Code must contain only numbers"), 
})

export type verifyCodeType = z.infer<typeof verifyCodeSchema>

export const resetPasswordSchema = z.object({
    email: z.string()
        .nonempty("Email is Required")
        .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Email is not valid"),

    newPassword: z.string()
        .nonempty("New Password is Required")
        .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{6,}$/, "Weak password (use Uppercase, Lowercase, and Numbers)"),
})

export type resetPasswordType = z.infer<typeof resetPasswordSchema>