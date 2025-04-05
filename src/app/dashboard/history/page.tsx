import { DataTable } from "./data-table";
const data = [
  {
    id: "1292fnuiwwef",
    technicalSpecification: "Хуй",
    updatedAt: new Date(),
    status: "done",
  },
  {
    id: "qdqwdqwd",
    technicalSpecification: "Хуй",
    updatedAt: new Date(),
    status: "error",
  },
  {
    id: "1292fnuiqwddqdqwdwwef",
    technicalSpecification: "Хуй",
    updatedAt: new Date(),
    status: "inProcess",
  },
];

export default function History() {
  return (
    <>
      <h1 className="text-xl font-bold">Актуальные тех. задания</h1>
      <DataTable data={data} />
    </>
  );
}
