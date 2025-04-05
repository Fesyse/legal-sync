"use client";
import { api } from "@/trpc/react";
import { DataTable } from "./data-table";

export default function History() {
  const { data } = api.technicalSpecification.getAll.useQuery();

  return (
    <>
      <h1 className="text-xl font-bold">Актуальные тех. задания</h1>
      <DataTable data={data ?? []} />
    </>
  );
}
