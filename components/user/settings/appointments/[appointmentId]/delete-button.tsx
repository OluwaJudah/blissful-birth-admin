"use client";
import { IconTrash } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { useUsers } from "./context/users-context";

export function DeleteAppointmmentButton() {
  const { setOpen } = useUsers();

  return (
    <div className="flex gap-2">
      <Button className="space-x-1" onClick={() => setOpen("delete")}>
        <span>Delete</span> <IconTrash size={18} />
      </Button>
    </div>
  );
}
