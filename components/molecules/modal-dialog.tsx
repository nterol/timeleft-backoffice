"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

interface ModalDialogProps {
    children: React.ReactNode;
    testId?: string;
    onClose?: () => void;
}

export function ModalDialog({ children, testId, onClose }: ModalDialogProps) {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const router = useRouter();

    useEffect(() => {
        const dialog = dialogRef.current;
        if (dialog) {
            dialog.showModal();
        }

        return () => {
            if (dialog) {
                dialog.close();
            }
        };
    }, []);

    const handleClose = () => {
        const dialog = dialogRef.current;
        if (dialog) {
            dialog.close();
        }
        if (onClose) {
            onClose();
        } else {
            router.back();
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
            className="backdrop:bg-black/50 backdrop:blur-sm rounded-lg border p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto bg-background"
            style={{ margin: 'auto' }}
        >
            {children}
        </dialog>
    );
}
