"use client";

import type { JoinPrefill } from "@/lib/join-tracks";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type JoinModalContextValue = {
  open: boolean;
  prefill: JoinPrefill | null;
  openJoin: (prefill?: JoinPrefill) => void;
  closeJoin: () => void;
};

const JoinModalContext = createContext<JoinModalContextValue | null>(null);

export function JoinModalProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [prefill, setPrefill] = useState<JoinPrefill | null>(null);

  const openJoin = useCallback((next?: JoinPrefill) => {
    setPrefill(next ?? null);
    setOpen(true);
  }, []);

  const closeJoin = useCallback(() => {
    setOpen(false);
    setPrefill(null);
  }, []);

  const value = useMemo(
    () => ({ open, prefill, openJoin, closeJoin }),
    [open, prefill, openJoin, closeJoin]
  );

  return (
    <JoinModalContext.Provider value={value}>{children}</JoinModalContext.Provider>
  );
}

export function useJoinModal() {
  const ctx = useContext(JoinModalContext);
  if (!ctx) throw new Error("useJoinModal must be used within JoinModalProvider");
  return ctx;
}
