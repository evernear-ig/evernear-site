"use client";

import { useJoinModal } from "@/components/trinexus/providers/JoinModalProvider";
import { T } from "@/components/trinexus/ui/T";

export function JoinButton({
  className = "btn btn-green",
  labelKey = "cta.join",
  onOpen,
}: {
  className?: string;
  labelKey?: string;
  onOpen?: () => void;
}) {
  const { openJoin } = useJoinModal();
  return (
    <button
      type="button"
      className={className}
      onClick={() => {
        onOpen?.();
        openJoin();
      }}
    >
      <T k={labelKey} />
    </button>
  );
}
