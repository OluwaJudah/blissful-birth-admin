"use client";
import { useUsers } from "./context/users-context";
import { CreateNewActionDialog } from "./create-new-dialog";
import { UsersActionDialog } from "./users-action-dialog";

export function UsersDialogs({ userId }: { userId: string }) {
  const { open, setOpen } = useUsers();
  return (
    <>
      <CreateNewActionDialog
        userId={userId}
        open={open === "add"}
        onOpenChange={() => setOpen("add")}
      />

      <UsersActionDialog
        userId={userId}
        open={open === "generate"}
        onOpenChange={() => setOpen("generate")}
      />
    </>
  );
}
