"use client";

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
  openJoin: () => void;
  closeJoin: () => void;
};

const JoinModalContext = createContext<JoinModalContextValue | null>(null);

export function JoinModalProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  const openJoin = useCallback(() => setOpen(true), []);
  const closeJoin = useCallback(() => setOpen(false), []);

  const value = useMemo(
    () => ({ open, openJoin, closeJoin }),
    [open, openJoin, closeJoin]
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
