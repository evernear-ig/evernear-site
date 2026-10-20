"use client";

import { useJoinModal } from "@/components/evernear/providers/JoinModalProvider";
import { T } from "@/components/evernear/ui/T";
import type { JoinPrefill } from "@/lib/join-tracks";

export function JoinButton({
  className = "btn btn-green",
  labelKey = "cta.join",
  prefill,
  onOpen,
}: {
  className?: string;
  labelKey?: string;
  prefill?: JoinPrefill;
  onOpen?: () => void;
}) {
  const { openJoin } = useJoinModal();
  return (
    <button
      type="button"
      className={className}
      onClick={() => {
        onOpen?.();
        openJoin(prefill);
      }}
    >
      <T k={labelKey} />
    </button>
  );
}
