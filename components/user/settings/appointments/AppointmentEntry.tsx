import { Badge } from "@/components/ui/badge";
import { FIRST_APPOINTMENT, trimesters } from "@/constants/user";
import { calculateTrimester } from "@/utils";
import { IconCalendarEvent, IconChevronRight } from "@tabler/icons-react";
import Link from "next/link";

const AppointmentEntry = ({
  id,
  date,
  time,
  status,
  type,
  pregnancyWeeks,
  userId,
}: {
  id: string;
  date: string;
  time: string;
  status: string;
  type: string;
  pregnancyWeeks: number;
  userId: string;
}) => {
  const trimester = calculateTrimester(pregnancyWeeks);
  const trimesterStr = trimesters[trimester];
  const label =
    type === FIRST_APPOINTMENT
      ? "FIRST APPOINTMENT"
      : `Week ${pregnancyWeeks} - ${trimesterStr} Trimester`;

  let url = `/user/settings/${userId}/appointments/${id}`;

  if (type === FIRST_APPOINTMENT) url += "?first=true";

  return (
    <Link href={url}>
      <h2 className="mb-1 font-semibold">{label}</h2>
      <div className="rounded-lg border flex justify-between items-center gap-3 p-4 hover:shadow-md">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-between">
            <div
              className={`flex size-10 items-center justify-center rounded-lg bg-muted p-2`}
            >
              <IconCalendarEvent />
            </div>
          </div>
          <div>
            <h2 className="font-semibold">
              {date}, {time}
            </h2>
          </div>
        </div>
        <div className="flex gap-3">
          <Badge variant="outline">{status}</Badge>
          <IconChevronRight />
        </div>
      </div>
    </Link>
  );
};

export default AppointmentEntry;
