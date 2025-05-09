"use client";
import { useUsers } from "./context/users-context";
import { UsersActionDialog } from "./users-action-dialog";

export function UsersDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useUsers();
  return (
    <>
      <UsersActionDialog
        key="user-add"
        open={open === "add"}
        onOpenChange={() => setOpen("add")}
      />
    </>
  );
}
