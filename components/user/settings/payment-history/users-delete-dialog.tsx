"use client";
import { IconAlertTriangle } from "@tabler/icons-react";
import { toast } from "@/hooks/use-toast";
import { ConfirmDialog } from "@/components/confirm-dialog";
import { User } from "./data/schema";
import { deletePayment } from "@/actions/payment-history";
import { usePathname } from "next/navigation";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentRow: User;
}

export function UsersDeleteDialog({ open, onOpenChange, currentRow }: Props) {
  const pathname = usePathname();

  const handleDelete = async () => {
    await deletePayment(currentRow.id, pathname);
    onOpenChange(false);
    toast({
      title: "The following user has been deleted:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">
            {JSON.stringify(currentRow, null, 2)}
          </code>
        </pre>
      ),
    });
  };

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      handleConfirm={handleDelete}
      title={
        <span className="text-destructive">
          <IconAlertTriangle
            className="mr-1 inline-block stroke-destructive"
            size={18}
          />{" "}
          Delete Payment
        </span>
      }
      desc={
        <div className="space-y-4">
          <p className="mb-2">
            Are you sure you want to delete payment entry?
            <br />
            This action will permanently remove the payment entry from the
            system. This cannot be undone.
          </p>
        </div>
      }
      confirmText="Delete"
      destructive
    />
  );
}
