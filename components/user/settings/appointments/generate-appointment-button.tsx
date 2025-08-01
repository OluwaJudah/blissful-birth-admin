"use client";
import { IconPlus } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { useUsers } from "./context/users-context";

export function GenerateAppointmentButton() {
  const { setOpen } = useUsers();

  return (
    <Button className="space-x-1" onClick={() => setOpen("generate")}>
      <span>Generate</span> <IconPlus size={18} />
    </Button>
  );
}
