"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function CreateTechnicalSpecificationButton() {
  const utils = api.useUtils();
  const router = useRouter();

  const { mutate: create } = api.technicalSpecification.create.useMutation({
    onSuccess: (data) => {
      toast.success("Шаблон технического задания успешно создан!");
      utils.technicalSpecification.getAll.invalidate();
      router.push(`/dashboard/task/${data.id}`);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

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
