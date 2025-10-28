"use client";
import { MotherInfoData } from "@/definitions/mother-info";
import { useUsers } from "./context/users-context";
import { EditProfileDialog } from "./edit-profile-dialog";
import { DeleteProfileDialog } from "./delete-profile-dialog";

export function UsersDialogsClient({
  name,
  motherInfoData,
}: {
  name: string;
  motherInfoData: MotherInfoData;
}) {
  const { open, setOpen } = useUsers();
  return (
    <>
      <DeleteProfileDialog
        name={name}
        motherInfoData={motherInfoData}
        open={open === "delete"}
        onOpenChange={() => setOpen("delete")}
      />

      <EditProfileDialog
        motherInfoData={motherInfoData}
        open={open === "edit"}
        onOpenChange={() => setOpen("edit")}
      />
    </>
  );
}
