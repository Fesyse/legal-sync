import { TechnicalSpecificationDetail } from "@/app/dashboard/task/[id]/technical-specification-detail";
import { api, HydrateClient } from "@/trpc/server";

export default async function EditorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  void api.technicalSpecification.getById.prefetch({ id });

  return (
    <HydrateClient>
      <TechnicalSpecificationDetail id={id} />
    </HydrateClient>
  );
}
