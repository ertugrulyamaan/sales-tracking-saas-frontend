import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("Gecerli bir email giriniz"),
  password: z.string().min(6, "Sifre en az 6 karakter olmali"),
});

export const registerSchema = loginSchema;

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
