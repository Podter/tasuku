import { z } from "zod";

export const ListSchema = z.object({
  name: z.string().min(1),
});
