"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  IconCalendar,
  IconDots,
  IconPrinter,
  IconX,
} from "@tabler/icons-react";
import { useUsers } from "./context/users-context";

export function AppointmentOptionsDropdown({
  id,
  isClosed,
}: {
  id: string;
  isClosed: boolean;
}) {
  const { setOpen } = useUsers();

  const handlePrintAppointment = async () => {
    setOpen("print");

    const response = await fetch(`/api/print-appointments/${id}`);
    if (!response.ok) return alert("Failed to download PDF");

    const blob = await response.blob();
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "appointment-report.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setOpen("");
  };

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
              onClick={handlePrintAppointment}
            >
              <IconPrinter size={18} />
              Print Appointment
            </div>
          </DropdownMenuItem>

          {!isClosed && (
            <>
              <DropdownMenuItem asChild>
                <div
                  className="flex items-center gap-2"
                  onClick={() => setOpen("generate")}
                >
                  <IconCalendar size={18} />
                  Generate Appointments
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <div
                  className="flex items-center gap-2"
                  onClick={() => setOpen("close")}
                >
                  <IconX size={18} />
                  Close Appointments
                </div>
              </DropdownMenuItem>{" "}
            </>
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
