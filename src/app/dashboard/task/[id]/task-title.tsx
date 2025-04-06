"use client";

import debounce from "lodash.debounce";
import { api } from "@/trpc/react";
import { useParams, usePathname } from "next/navigation";
import { useCallback, useState } from "react";
import { Input } from "@/components/ui/input";

export const TaskTitle = () => {
  const pathname = usePathname();
  const { id } = useParams<{ id: string }>();
  const isNotePage = pathname.startsWith("/dashboard/task");

  const utils = api.useUtils();
  const { data: technicalSpecification } =
    api.technicalSpecification.getById.useQuery(
      { id },
      { enabled: isNotePage },
    );
  const { mutate: update } =
    api.technicalSpecification.updateById.useMutation();

  const handleChange = useCallback(
    debounce(async (e: React.ChangeEvent<HTMLInputElement>) => {
      update({
        id,
        title: e.target.value,
      });

      await Promise.all([
        utils.technicalSpecification.getAll.invalidate(),
        utils.technicalSpecification.getById.invalidate({ id }),
      ]);
    }, 500),
    [id, update],
  );

  if (!isNotePage) {
    return null;
  }

  return (
    <Input
      className="max-w-sm"
      placeholder="Название задания"
      defaultValue={technicalSpecification?.title}
      onChange={handleChange}
    />
  );
};
