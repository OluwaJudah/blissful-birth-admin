"use client";
import { MotherInfoData } from "@/definitions/mother-info";
import { useUsers } from "./context/users-context";
import { EditProfileDialog } from "./edit-profile-dialog";

export function UsersDialogs({
  motherInfoData,
}: {
  motherInfoData: MotherInfoData;
}) {
  const { open, setOpen } = useUsers();
  return (
    <>
      <EditProfileDialog
        motherInfoData={motherInfoData}
        open={open === "edit"}
        onOpenChange={() => setOpen("edit")}
      />
    </>
  );
}
