import * as z from "zod";

export const checkoutSchema = z.object({
  details: z.string().min(1, "Address details are required"),
  phone: z.string()
  .min(11, "Phone number must be 11 digits") 
  .max(11, "Phone number must be 11 digits")
  .regex(/^01[0125][0-9]{8}$/, "Invalid Egyptian phone number (must start with 010, 011, 012, or 015)"),
  city: z.string().min(1, "City name is required"),
});

export type CheckoutValues = z.infer<typeof checkoutSchema>;