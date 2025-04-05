import { TechnicalSpecificationDetail } from "@/app/dashboard/task/[id]/technical-specification-detail";

export default async function EditorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <TechnicalSpecificationDetail id={id} />;
}
