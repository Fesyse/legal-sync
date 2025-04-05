import type { TechnicalSpecificationSchema } from "@/lib/schemas";
import { api } from "@/trpc/server";
import { DataTable } from "./data-table";
// const data = [
//   {
//     id: "1292fnuiwwef",
//     technicalSpecification: "Хуй",
//     updatedAt: new Date(),
//     status: "done",
//   },
//   {
//     id: "qdqwdqwd",
//     technicalSpecification: "Хуй",
//     updatedAt: new Date(),
//     status: "error",
//   },
//   {
//     id: "1292fnuiqwddqdqwdwwef",
//     technicalSpecification: "Хуй",
//     updatedAt: new Date(),
//     status: "inProcess",
//   },
// ];

export default async function History() {
  const data: TechnicalSpecificationSchema[] =
    await api.technicalSpecification.getAll();
  return (
    <>
      <h1 className="text-xl font-bold">Актуальные тех. задания</h1>
      <DataTable data={data} />
    </>
  );
}
