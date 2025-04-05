"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { npaSchema, type NpaSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Filter, Search } from "lucide-react";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
export const SearchForm = () => {
  const form = useForm<NpaSchema>({
    resolver: zodResolver(npaSchema),
    defaultValues: {
      description: "",
      name: "",
      sentensePart: "",
      new: false,
      recommendations: "",
    },
  });
  const onSubmit: SubmitHandler<NpaSchema> = (data) => {
    // TODO: ДАЛЬЕ САМИ РЕШАЙТЕ ЕПТА
  };
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button
        variant={"outline"}
        size={"icon"}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Filter />
      </Button>

      <Form {...form}>
        <form
          className={`bg-background absolute top-0 z-2 flex h-full w-[40%] flex-col gap-3 p-4 opacity-[98%] transition-all duration-300 ${isOpen ? "right-0" : "-right-full"}`}
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Название</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Название"
                    className={
                      form.formState.errors.name ? "border-red-500" : ""
                    }
                  />
                </FormControl>
                <FormMessage>
                  {form.formState.errors.name && (
                    <span className="text-red-500">
                      {form.formState.errors.name.message}
                    </span>
                  )}
                </FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Описание</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Описание"
                    className={
                      form.formState.errors.name ? "border-red-500" : ""
                    }
                  />
                </FormControl>
                <FormMessage>
                  {form.formState.errors.name && (
                    <span className="text-red-500">
                      {form.formState.errors.name.message}
                    </span>
                  )}
                </FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="new"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex items-center gap-2">
                    {" "}
                    <Checkbox
                      name="new"
                      checked={field.value}
                      onCheckedChange={(value) => field.onChange(value)}
                    />
                    <FormLabel htmlFor="new">Анонсированные</FormLabel>
                  </div>
                </FormControl>
                <FormMessage>
                  {form.formState.errors.name && (
                    <span className="text-red-500">
                      {form.formState.errors.name.message}
                    </span>
                  )}
                </FormMessage>
              </FormItem>
            )}
          />
          <div className="flex justify-end">
            <Button className="" size={"icon"} type="submit">
              <Search />
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};
