import { z } from "zod";
export const STATUS = ["done", "error", "inProcess"] as const;
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

export const npaSchema = z.object({
  name: z.string(),
  description: z.string(),
  sentensePart: z.string(),
  new: z.boolean().default(false), // анонс или нет
  recommendations: z.string(),
  id: z.string(),
});
export const TYPE = ["announced", "default"] as const;
export const technicalSpecificationSchema = z.object({
  id: z.string(),
  title: z.string(),
  npa: z.array(z.string()), // массив npa к моему тех заданию
  createdAt: z.date().nullable(),
  updatedAt: z.date().nullable(),
  userId: z.string(),
  status: z.enum(STATUS),
});
export type NpaSchema = z.infer<typeof npaSchema>;
export type TechnicalSpecificationSchema = z.infer<
  typeof technicalSpecificationSchema
>;
export type AuthSignInSchema = z.infer<typeof authSignInSchema>;
export type AuthSignUpSchema = z.infer<typeof authSignUpSchema>;
