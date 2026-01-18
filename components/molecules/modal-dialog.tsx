"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useCallback } from "react";

interface ModalDialogProps {
  children: React.ReactNode;
  testId?: string;
  onClose?: () => void;
}

export function ModalDialog({ children, testId, onClose }: ModalDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const router = useRouter();

  const handleDialogClose = useCallback(() => {
    if (onClose) {
      onClose();
    } else {
      router.back();
    }
  }, [onClose, router]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog) {
      dialog.showModal();
    }

    dialog?.addEventListener("close", handleDialogClose);

    return () => {
      dialog?.removeEventListener("close", handleDialogClose);
    };
  }, [handleDialogClose]);

  const handleClose = () => {
    const dialog = dialogRef.current;
    if (dialog) {
      dialog.close();
    }
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) {
      handleClose();
    }
  };

  return (
    <dialog
      ref={dialogRef}
      data-testid={testId}
      onClick={handleBackdropClick}
      className="bg-background max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg border p-6 backdrop:bg-black/50 backdrop:blur-sm"
      style={{ margin: "auto" }}
    >
      {children}
    </dialog>
  );
}
