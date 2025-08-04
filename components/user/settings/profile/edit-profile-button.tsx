"use client";
import { IconEdit } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { useUsers } from "./context/users-context";

export function EditProfileButton() {
  const { setOpen } = useUsers();

  return (
    <Button className="space-x-1" onClick={() => setOpen("edit")}>
      <span>Edit Profile</span> <IconEdit size={18} />
    </Button>
  );
}
