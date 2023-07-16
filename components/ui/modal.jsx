"use client";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";

export default function Modal({
  title,
  description,
  isOpen,
  onClose,
  children,
}) {
  const onChange = (open) => {
    if (!open) {
      onClose();
    }
  };
  return (
    <>
      <Dialog open={isOpen} onOpenChange={onChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{title} </DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          <div>{children}</div>
        </DialogContent>
      </Dialog>
    </>
  );
}
