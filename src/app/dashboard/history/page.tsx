"use client";
import { api } from "@/trpc/react";
import { DataTable } from "./data-table";

export default function History() {
  const { data: technicalSpecifications } =
    api.technicalSpecification.getAll.useQuery();

  return (
    <>
      <h1 className="text-xl font-bold">Актуальные тех. задания</h1>
      <DataTable data={technicalSpecifications ?? []} />
    </>
  );
}
