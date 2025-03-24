import { Badge } from "@/components/ui/badge";
import { IconCalendarEvent, IconChevronRight } from "@tabler/icons-react";

const AppointmentEntry = () => {
  return (
    <>
      <h2 className="mb-1 font-semibold">Week 8 - 2nd Trimester</h2>

      <div className="rounded-lg border flex justify-between items-center gap-3 p-4 hover:shadow-md">
        <div className="flex items-center gap-3">
          {" "}
          <div className="flex items-center justify-between">
            <div
              className={`flex size-10 items-center justify-center rounded-lg bg-muted p-2`}
            >
              <IconCalendarEvent />
            </div>
          </div>
          <div>
            <h2 className="font-semibold">02 Jan 2025, 10:00 AM</h2>
          </div>
        </div>
        <div className="flex gap-3">
          {" "}
          <Badge variant="outline">Pending</Badge>
          <IconChevronRight />
        </div>
      </div>
    </>
  );
};

export default AppointmentEntry;
