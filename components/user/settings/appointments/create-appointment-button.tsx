"use client";
import { IconPlus } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { useUsers } from "./context/users-context";

export function CreateAppointmmentButton() {
  const { setOpen } = useUsers();

  return (
    <Button className="space-x-1" onClick={() => setOpen("add")}>
      <span>Add New</span> <IconPlus size={18} />
    </Button>
  );
}
