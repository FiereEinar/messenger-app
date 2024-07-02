import { z } from "zod";

export const userUpdateValidation = z.object({
  firstname: z.string().min(1, 'First name must not be empty'),
  lastname: z.string().min(1, 'Last name must not be empty'),
  username: z.string().min(1, 'Username must not be empty'),
  bio: z.string(),
});

export const userPasswordUpdateValidation = z.object({
  oldPassword: z.string().min(5, 'Password should be atleast 5 characters'),
  newPassword: z.string().min(5, 'New password should be atleast 5 characters'),
  confirmNewPassword: z.string().min(5, 'New password should be atleast 5 characters'),
}).refine((data) => data.newPassword === data.confirmNewPassword, {
  message: 'Passwords must match.',
  path: ['confirmNewPassword']
});
