import { z } from "zod";

const UsernameSchema = z
  .string()
  .min(4, { message: "Username must be at least 4 characters long" })
  .max(30, { message: "Username must be at most 30 characters long" })
  .regex(/^[a-zA-Z0-9_]+$/, {
    message:
      "Username must only contain alphanumeric characters and underscores",
  });

const PasswordSchema = z
  .string()
  .min(8, {
    message: "Password must be at least 8 characters long",
  })
  .max(255, {
    message: "Password must be at most 255 characters long",
  });

export const SignUpSchema = z
  .object({
    username: UsernameSchema,
    password: PasswordSchema,
    passwordConfirm: PasswordSchema,
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords do not match",
    path: ["passwordConfirm"],
  });

export const LoginSchema = z.object({
  username: UsernameSchema,
  password: PasswordSchema,
});
