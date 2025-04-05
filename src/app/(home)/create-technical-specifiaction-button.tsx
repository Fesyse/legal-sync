"use client";
import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function CreateTechnicalSpecificationButton() {
  const { mutate: create } = api.technicalSpecification.create.useMutation({
    onSuccess: (data) => {
      toast.success("Шаблон технического задания успешно создан!");
      router.push(`/dashboard/task/${data.id}`);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  const router = useRouter();
  return (
    <Button
      onClick={() => {
        create({
          title: "Тестовое название",
          status: "inProcess",
          npa: [],
        });
      }}
      variant="outline"
    >
      Создать техническое задание
    </Button>
  );
}
