"use client";
import { useUsers } from "./context/users-context";
import { UsersDeleteDialog } from "./users-delete-dialog";
import { UsersActionDialog } from "./users-action-dialog";

export function UsersDialogs({ userId }: { userId: string }) {
  const { open, setOpen, currentRow, setCurrentRow } = useUsers();
  return (
    <>
      <UsersActionDialog
        userId={userId}
        key="user-add"
        open={open === "add"}
        onOpenChange={() => {
          setOpen("add");
        }}
      />

      {currentRow && (
        <>
          <UsersActionDialog
            userId={userId}
            key="user-edit"
            open={open === "edit"}
            onOpenChange={() => {
              setOpen("edit");
              setTimeout(() => {
                setCurrentRow(null);
              }, 500);
            }}
            currentRow={currentRow}
          />

          <UsersDeleteDialog
            key={"user-delete"}
            open={open === "delete"}
            onOpenChange={() => {
              setOpen("delete");
              setTimeout(() => {
                setCurrentRow(null);
              }, 500);
            }}
            currentRowId={currentRow.id!}
          />
        </>
      )}
    </>
  );
}
