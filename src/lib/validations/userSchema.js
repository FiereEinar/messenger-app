import { z } from "zod";

export const userUpdateValidation = z.object({
  firstname: z.string().min(1, 'First name must not be empty'),
  lastname: z.string().min(1, 'Last name must not be empty'),
  username: z.string().min(1, 'Username must not be empty'),
  bio: z.string(),
});
