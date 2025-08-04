"use client";
import { useUsers } from "./context/users-context";
import { EditProfileDialog } from "./edit-profile-dialog";

export function UsersDialogs({ userId, age, g, p, packageType }: { userId: string, age: number, g: number, p: number, packageType: string }) {
  const { open, setOpen } = useUsers();
  return (
    <>
      <EditProfileDialog
        userId={userId}
        age={age}
        g={g}
        p={p}
        packageType={packageType}
        open={open === "edit"}
        onOpenChange={() => setOpen("edit")}
      />
    </>
  );
}
