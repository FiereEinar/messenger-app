import { z } from "zod";

export const createGroupValidation = z.object({
  name: z.string().min(3, 'Group name should be atleast 3 characters')
});
