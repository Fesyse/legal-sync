import { NPAForm } from "@/app/(home)/npa-form";
import { default as HomePage } from "@/app/(home)/page";

export default async function EditorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <NPAForm />;
}
