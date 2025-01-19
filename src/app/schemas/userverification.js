
import { z } from 'zod';

export const userVerificationSchema = z.object({
   
    email: z.string()
        .email({ message: "Invalid email address" }),

        password: z.string()
        .min(2, { message: "Password is required" })
        .max(10, { message: "Password must be at most 10 characters long" })
});

export default userVerificationSchema;

