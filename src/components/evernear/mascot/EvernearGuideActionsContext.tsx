"use client";

import { createContext, useContext, type ReactNode } from "react";

type EvernearGuideActions = {
  exitTour: () => void;
};

const EvernearGuideActionsContext = createContext<EvernearGuideActions | null>(
  null,
);

export function EvernearGuideActionsProvider({
  exitTour,
  children,
}: {
  exitTour: () => void;
  children: ReactNode;
}) {
  return (
    <EvernearGuideActionsContext.Provider value={{ exitTour }}>
      {children}
    </EvernearGuideActionsContext.Provider>
  );
}

export function useEvernearGuideActions() {
  return useContext(EvernearGuideActionsContext);
}
