"use client";
import { IconEdit, IconPlus } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { useUsers } from "./context/users-context";

export function AppointmmentPrimaryButton() {
  const { setOpen } = useUsers();

  return (
    <div className="flex gap-2">
      <Button className="space-x-1" onClick={() => setOpen("add")}>
        <span>Reschedule</span> <IconEdit size={18} />
      </Button>
    </div>
  );
}
