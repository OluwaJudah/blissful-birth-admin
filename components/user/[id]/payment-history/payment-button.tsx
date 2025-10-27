"use client";
import { IconPlus } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { useUsers } from "./context/users-context";

export function PaymentPrimaryButton() {
  const { setOpen } = useUsers();
  return (
    <div className="flex gap-2">
      <Button className="space-x-1" onClick={() => setOpen("add")}>
      <span>Create</span> <IconPlus size={18} />
      </Button>
    </div>
  );
}
