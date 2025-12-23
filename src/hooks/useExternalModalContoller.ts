import type { ModalContextType } from "@/types";
import { useState } from "react";

export default function useExternalModalController() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const modalController: ModalContextType = {
    isOpen: isModalOpen,
    open: () => {
      setIsModalOpen(true);
    },
    close: () => {
      setIsModalOpen(false);
    },
    toggle: () => {
      setIsModalOpen((prev) => !prev);
    },
  };

  return modalController;
}
