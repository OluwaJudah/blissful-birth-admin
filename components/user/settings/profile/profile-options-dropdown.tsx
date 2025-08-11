"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IconDots } from "@tabler/icons-react";
import { useUsers } from "./context/users-context";
import { Trash } from "lucide-react";

export function ProfileOptionsDropdown({ id }: { id: string }) {
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
          <DropdownMenuItem asChild>
            <div
              className="flex items-center gap-2"
              onClick={() => setOpen("delete")}
            >
              <Trash size={18} className="text-red-500" />
              <p className="text-red-600 hover:text-red-500">Delete Profile</p>
            </div>
          </DropdownMenuItem>{" "}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
