import { z } from "zod";

export const messageValidation = z.object({
  message: z.string()
});
