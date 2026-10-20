"use client";

import { Toaster } from "sonner";

const TOAST_DURATION_MS = 1000;

export function AppToaster() {
  return (
    <Toaster
      theme="dark"
      richColors
      position="bottom-center"
      duration={TOAST_DURATION_MS}
      closeButton
      expand
      visibleToasts={1}
      offset="max(20px, env(safe-area-inset-bottom))"
      mobileOffset={{
        bottom: "max(24px, env(safe-area-inset-bottom))",
        left: "max(16px, env(safe-area-inset-left))",
        right: "max(16px, env(safe-area-inset-right))",
      }}
      toastOptions={{
        duration: TOAST_DURATION_MS,
        classNames: {
          toast: "evernear-toast",
          title: "evernear-toast__title",
          description: "evernear-toast__desc",
          closeButton: "evernear-toast__close",
        },
      }}
    />
  );
}
