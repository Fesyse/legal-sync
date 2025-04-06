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
import {
  defaultNpaFilters,
  filterNpaSchema,
  type FilterNpaSchema,
} from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Filter, X } from "lucide-react";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";

type SearchFormProps = {
  filters: FilterNpaSchema | undefined;
  setFilters: (filters: FilterNpaSchema | undefined) => void;
};

export const SearchForm: React.FC<SearchFormProps> = ({
  filters,
  setFilters,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const form = useForm<FilterNpaSchema>({
    resolver: zodResolver(filterNpaSchema),
    defaultValues: defaultNpaFilters,
  });

  const onSubmit: SubmitHandler<FilterNpaSchema> = (data) => {
    setFilters(data);
  };

  return (
    <>
      <Button
        className="absolute left-16"
        variant={"outline"}
        size={"icon"}
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
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
                    placeholder="Название..."
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
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Описание</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Описание..."
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
            name="sentensePart"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Отрывок из ТЗ</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Отрывок из ТЗ..."
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

          <div className="flex justify-end gap-2">
            {filters ? (
              <Button
                size="icon"
                variant="secondary"
                onClick={() => {
                  setFilters(undefined);
                  form.reset();
                }}
              >
                <X />
              </Button>
            ) : null}
            <Button type="submit">
              Отфильтровать <Filter />
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};
