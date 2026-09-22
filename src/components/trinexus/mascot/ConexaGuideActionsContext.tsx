"use client";

import { createContext, useContext, type ReactNode } from "react";

type ConexaGuideActions = {
  exitTour: () => void;
};

const ConexaGuideActionsContext = createContext<ConexaGuideActions | null>(
  null,
);

export function ConexaGuideActionsProvider({
  exitTour,
  children,
}: {
  exitTour: () => void;
  children: ReactNode;
}) {
  return (
    <ConexaGuideActionsContext.Provider value={{ exitTour }}>
      {children}
    </ConexaGuideActionsContext.Provider>
  );
}

export function useConexaGuideActions() {
  return useContext(ConexaGuideActionsContext);
}
