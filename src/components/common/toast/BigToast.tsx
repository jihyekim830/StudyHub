import type { BigToast } from "@/types";
import { BanIcon, CheckIcon } from "lucide-react";

interface BigToastProps {
  bigToast: BigToast;
}

export default function BigToast({ bigToast }: BigToastProps) {
  const { status, title, text } = bigToast;

  return (
    <div className="flex min-w-3xs flex-col items-center justify-center gap-10 rounded-xl border border-neutral-400 bg-neutral-100 p-8 shadow-lg">
      {status === "success" ? (
        <CheckIcon className="bg-success size-8 rounded-full p-1 text-white" />
      ) : (
        <BanIcon className="text-danger size-8" />
      )}

      <span className="text-xl font-bold">{title}</span>
      <span className="text-neutral-600">{text}</span>
    </div>
  );
}
