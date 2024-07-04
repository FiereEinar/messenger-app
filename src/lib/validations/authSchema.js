import { z } from "zod";

export const loginValidation = z.object({
  username: z.string().min(1, 'Username should not be empty'),
  password: z.string().min(5, 'Password should be atleast 5 characters'),
});

export const signupSchema = z.object({
  firstname: z.string().min(1, 'First name should not be empty'),
  lastname: z.string().min(1, 'Last name should not be empty'),
  username: z.string().min(1, 'Username should not be empty'),
  password: z.string().min(5, 'Password should be atleast 5 characters'),
  confirmPassword: z.string().min(5, 'Password should be atleast 5 characters'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords must match.',
  path: ['confirmPassword']
});
