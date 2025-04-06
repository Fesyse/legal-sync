import { api } from "@/trpc/server";
import { DataTable } from "./data-table";

export default async function History() {
  const technicalSpecifications = await api.technicalSpecification.getAll();

  return (
    <>
      <h1 className="text-xl font-bold">Актуальные тех. задания</h1>
      <DataTable data={technicalSpecifications} />
    </>
  );
}
