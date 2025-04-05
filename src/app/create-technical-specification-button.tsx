import { api } from "@/trpc/react";

export function CreateTechnicalSpecificationButton() {
  const {} = api.return(
    <Button onClick={() => create()} variant="outline">
      Создать техническое задание
    </Button>,
  );
}
