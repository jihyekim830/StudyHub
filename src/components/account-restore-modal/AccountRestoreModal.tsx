import type { ModalContextType } from "@/types";
import { useState } from "react";
import {
  AccountRestoreAlertModal,
  AccountRestoreCompleteModal,
  AccountRestoreFormModal,
} from "@/components/";

interface AccountRestoreModalProps {
  externalModalControl: ModalContextType;
  expiredAt: Date;
}

export default function AccountRestoreModal({
  externalModalControl,
  expiredAt,
}: AccountRestoreModalProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);

  if (step === 1) {
    return (
      <AccountRestoreAlertModal
        externalModalControl={externalModalControl}
        setStep={setStep}
        expiredAt={expiredAt}
      />
    );
  } else if (step === 2) {
    return (
      <AccountRestoreFormModal
        externalModalControl={externalModalControl}
        setStep={setStep}
      />
    );
  } else {
    return (
      <AccountRestoreCompleteModal
        externalModalControl={externalModalControl}
      />
    );
  }
}
