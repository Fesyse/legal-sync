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

const npaSchema = z.object({
  name: z.string(),
  description: z.string(),
  sentensePart: z.string(),
});
export const technicalSpecificationSchema = z.object({
  id: z.string(),
  technicalSpecification: z.string(),
  npa: z.array(npaSchema), // массив npa к моему тех заданию
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type NpaSchema = z.infer<typeof npaSchema>;
export type TechnicalSpecificationSchema = z.infer<
  typeof technicalSpecificationSchema
>;
export type AuthSignInSchema = z.infer<typeof authSignInSchema>;
export type AuthSignUpSchema = z.infer<typeof authSignUpSchema>;
