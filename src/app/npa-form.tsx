import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Search } from "lucide-react";

export const NPAForm = () => {
  return (
    <form>
      <div className="flex gap-2.5">
        <Button
          size="icon"
          variant="secondary"
          className="bg-input/30 border-input mt-0.5 border"
        >
          <Search />
        </Button>

        <Textarea
          placeholder="Напишите свое тз здесь... Или же прикрепите файл"
          className="max-h-40 min-h-10"
        />

        <Button
          type="button"
          size="icon"
          variant="secondary"
          className="bg-input/30 border-input mt-0.5 border"
        >
          <Plus />
        </Button>
      </div>
    </form>
  );
};
