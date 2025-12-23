import ModalOverlay from "@/components/common/modal/ModalOverlay";
import { ModalContent, ModalTrigger } from "@/components/common/modal";
import { ModalContext } from "@/hooks";
import React, { useState, type ReactElement } from "react";
import { createPortal } from "react-dom";
import type { ModalContextType } from "@/types";

type ModalChildren =
  | ReactElement<typeof ModalTrigger>
  | ReactElement<typeof ModalContent>;

interface ModalProps {
  children: ModalChildren | ModalChildren[];
  isOverlay?: boolean;
  externalModalControl?: ModalContextType;
}

export default function Modal({
  children,
  isOverlay = true,
  externalModalControl,
}: ModalProps) {
  const [isInternalOpen, setIsInternalOpen] = useState(false);

  const isOpen = externalModalControl
    ? externalModalControl.isOpen
    : isInternalOpen;

  const open = externalModalControl
    ? externalModalControl.open
    : () => setIsInternalOpen(true);

  const close = externalModalControl
    ? externalModalControl.close
    : () => setIsInternalOpen(false);

  const toggle = externalModalControl
    ? externalModalControl.toggle
    : () => setIsInternalOpen((prev) => !prev);

  const modalRoot = document.getElementById("modal-root")!;

  const trigger = React.Children.map(children, (child) =>
    child.type === ModalTrigger ? child : null
  );

  const content = React.Children.map(children, (child) =>
    child.type === ModalContent ? child : null
  );

  return (
    <ModalContext.Provider
      value={{
        isOpen,
        open,
        close,
        toggle,
      }}
    >
      {trigger}
      {isOpen &&
        createPortal(
          <>
            {isOverlay ? <ModalOverlay /> : null}
            {content}
          </>,
          modalRoot
        )}
    </ModalContext.Provider>
  );
}
