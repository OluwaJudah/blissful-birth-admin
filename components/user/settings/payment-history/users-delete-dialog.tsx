"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import { LoaderCircle } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useUsers } from "./context/users-context";
import { IconAlertTriangle } from "@tabler/icons-react";
import { User } from "./data/schema";
import { deletePayment } from "@/actions/payment-history";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentRow: User;
}

export function UsersDeleteDialog({ open, onOpenChange, currentRow }: Props) {
  const pathname = usePathname();
  const { setOpen } = useUsers();
  const [isPending, setIspending] = useState(false);
  const route = useRouter();

  return (
    <Dialog
      open={open}
      onOpenChange={(state) => {
        onOpenChange(state);
      }}
    >
      <DialogContent className="sm:max-w-lg">
        <DialogHeader className="text-left">
          <DialogTitle className="text-red-600 flex flex-row items-center gap-2">
            <IconAlertTriangle /> Delete Payment
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="-mr-4 w-full py-1 pr-4">
          <div className="space-y-4">
            <p className="mb-2 font-thin text-sm text-gray-900">
              Are you sure you want to delete payment entry?
              <br />
              This action will permanently remove the payment entry from the
              system. This cannot be undone.
            </p>
          </div>
        </ScrollArea>
        <div className="flex gap-2 justify-center">
          <Button
            type="button"
            onClick={() => setOpen("")}
            className="w-[120px] border text-black hover:bg-gray-200 bg-white-500"
          >
            Close
          </Button>

          {isPending ? (
            <Button
              type="button"
              className="w-[120px] hover:bg-red-500 bg-red-500"
            >
              <LoaderCircle className="animate-spin" />
            </Button>
          ) : (
            <Button
              onClick={async () => {
                setIspending(true);
                await deletePayment(currentRow.id, pathname);
                setOpen("");
                route.push(pathname);
              }}
              className="bg-red-500 text-white hover:bg-red-600"
              type="button"
              form="user-form"
            >
              Delete
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
