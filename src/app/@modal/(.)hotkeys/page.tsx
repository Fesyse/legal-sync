import { Hotkeys } from "@/components/hotkeys";
import { Modal } from "@/components/modal";
import { Suspense } from "react";

export default function HotkeysPage() {
  return (
    <Modal title="Настройки" description="Горячие клавиши сервиса">
      <Suspense fallback={<div>Loading...</div>}>
        <Hotkeys />
      </Suspense>
    </Modal>
  );
}
