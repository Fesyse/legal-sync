import { z } from "zod";

export const authSignInSchema = z.object({
  email: z.string().email({ message: "Неверный email" }),
  password: z
    .string()
    .min(8, { message: "Пароль должен быть не менее 8 символов" })
    .regex(/.*[0-9].*/, { message: "Пароль должен содержать цифры" })
    .regex(/.*[A-Z].*/, { message: "Пароль должен заглавные буквы" })
    .regex(/.*[a-z].*/, { message: "Пароль должен содержать строчные буквы" })
    .regex(/.*[!@#$%^&*()_+].*/, {
      message: "Пароль должен содержать специальные символы",
    }),
});

export const authSignUpSchema = z.object({
  name: z.string().min(4, { message: "Имя должно быть не менее 4 символов" }),
  email: z.string().email({ message: "Неверный email" }),
  password: z
    .string()
    .min(8, { message: "Пароль должен быть не менее 8 символов" })
    .regex(/.*[0-9].*/, { message: "Пароль должен содержать цифры" })
    .regex(/.*[A-Z].*/, { message: "Пароль должен заглавные буквы" })
    .regex(/.*[a-z].*/, { message: "Пароль должен содержать строчные буквы" })
    .regex(/.*[!@#$%^&*()_+].*/, {
      message: "Пароль должен содержать специальные символы",
    }),
});

export type AuthSignInSchema = z.infer<typeof authSignInSchema>;
export type AuthSignUpSchema = z.infer<typeof authSignUpSchema>;
