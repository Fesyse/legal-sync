"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authClient } from "@/lib/auth-client";
import { useMemo, useState } from "react";
import {
  authSignInSchema,
  authSignUpSchema,
  type AuthSignInSchema,
  type AuthSignUpSchema,
} from "@/lib/schemas";
import { Loader } from "@/components/ui/loader";
import { usePathname } from "next/navigation";

type AuthSchema = AuthSignInSchema | AuthSignUpSchema;

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();

  const type = pathname.endsWith("/sign-in") ? "signIn" : "signUp";
  const schema = useMemo(
    () => (type === "signIn" ? authSignInSchema : authSignUpSchema),
    [type],
  );

  const form = useForm<AuthSchema>({
    defaultValues: {
      ...(type === "signUp" ? { name: "" } : {}),
      email: "",
      password: "",
    },
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: AuthSchema) => {
    setIsLoading(true);

    const type = window.location.pathname.endsWith("/sign-in")
      ? "signIn"
      : "signUp";
    let result;

    if (type === "signIn") {
      result = await authClient.signIn.email({
        email: data.email,
        password: data.password,
      });
    } else {
      result = await authClient.signUp.email({
        name: (data as AuthSignUpSchema).name,
        email: data.email,
        password: data.password,
      });
    }

    if (result.error) {
      // TODO: add toast
    }

    setIsLoading(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-6">
          {type === "signUp" ? (
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="grid gap-3">
                  <FormLabel>Логин</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Ваш логин..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ) : null}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="grid gap-3">
                <FormLabel>Почта</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="m@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="grid gap-3">
                <FormLabel>Пароль</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Ваш пароль..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full cursor-pointer"
            disabled={isLoading}
          >
            {isLoading ? "Загрузка" : "Войти"}
            {isLoading ? <Loader /> : null}
          </Button>
        </div>
      </form>
    </Form>
  );
}
