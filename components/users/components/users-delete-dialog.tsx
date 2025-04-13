'use client'

import { useState, useTransition } from 'react'
import { IconAlertTriangle } from '@tabler/icons-react'
import { toast } from '@/hooks/use-toast'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ConfirmDialog } from '@/components/confirm-dialog'
import { IMotherInfo } from "@/definitions/mother-info"
import { useUsers } from "../context/users-context"

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow: IMotherInfo
}

export function UsersDeleteDialog({ currentRow, open, onOpenChange }: Props) {
  const { setOpen } = useUsers();
  const [isPending, startTransition] = useTransition();

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={(state) => {
        onOpenChange(state);
        if (!state) {
          setOpen(null);
        }
      }}
      title="Delete User"
      desc={`Are you sure you want to delete ${currentRow.fullName}? This action cannot be undone.`}
      confirmText="Delete"
      cancelBtnText="Cancel"
      handleConfirm={() => {
        startTransition(async () => {
          try {
            // Delete logic here
            toast({
              title: "Success",
              description: "User deleted successfully",
            });
            setOpen(null);
          } catch (error) {
            toast({
              title: "Error",
              description: "Something went wrong",
              variant: "destructive",
            });
          }
        });
      }}
      isLoading={isPending}
    />
  );
}
