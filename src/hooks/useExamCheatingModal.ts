import type { ModalContextType } from "@/types";
import { useEffect, useState } from "react";

function useExamCheatingModal(cheatingCount: number) {
  const [isOpen, setIsOpen] = useState(false);

  const modalControl: ModalContextType = {
    isOpen,
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
    toggle: () => setIsOpen((prev) => !prev),
  };

  useEffect(() => {
    if (cheatingCount > 0) setIsOpen(true);
  }, [cheatingCount]);

  return { modalControl };
}

export default useExamCheatingModal;
