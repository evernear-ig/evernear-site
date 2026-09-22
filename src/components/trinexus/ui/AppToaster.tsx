"use client";

import { Toaster } from "sonner";

export function AppToaster() {
  return (
    <Toaster
      theme="system"
      richColors
      position="top-center"
      offset={16}
      mobileOffset={{
        top: "max(16px, env(safe-area-inset-top))",
        left: "max(16px, env(safe-area-inset-left))",
        right: "max(16px, env(safe-area-inset-right))",
      }}
      toastOptions={{
        classNames: {
          toast: "!font-[family-name:var(--font-body)]",
          title: "!font-[family-name:var(--font-head)] !text-sm !font-semibold",
        },
      }}
    />
  );
}
