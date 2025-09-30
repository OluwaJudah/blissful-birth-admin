"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IconClipboardX, IconDots } from "@tabler/icons-react";
import { useUsers } from "./context/users-context";
import { Trash } from "lucide-react";
import {
  COMPLETED_APPOINTMENT,
  MISSED_APPOINTMENT,
} from "@/constants/appointment";

export function AppointmentOptionsDropdown({ status }: { status: string }) {
  const { setOpen } = useUsers();

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button className="space-x-1">
          <span>More</span> <IconDots size={18} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuGroup>
          {!(
            status === COMPLETED_APPOINTMENT || status === MISSED_APPOINTMENT
          ) && (
            <DropdownMenuItem asChild>
              <div
                className="flex items-center gap-2"
                onClick={() => setOpen("missed")}
              >
                <IconClipboardX size={18} />
                Missed Appointment
              </div>
            </DropdownMenuItem>
          )}

          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <div
              className="flex items-center gap-2"
              onClick={() => setOpen("delete")}
            >
              <Trash size={18} className="text-red-500" />
              <p className="text-red-600 hover:text-red-500">
                Delete Appointment
              </p>
            </div>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
