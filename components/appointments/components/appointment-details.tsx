import { Badge } from "@/components/ui/badge";
import { IconChevronRight } from "@tabler/icons-react";
import { User } from "lucide-react";
import Link from "next/link";
import React from "react";

const AppointmentDetails = ({
  id,
  userId,
  date,
  fullName,
  surname,
  status,
  pregnancyWeeks,
}: {
  id: string;
  userId: string;
  date: string;
  fullName: string;
  surname: string;
  status: string;
  pregnancyWeeks: number;
}) => {
  const dateStr = new Date(date);
  const formattedDate = dateStr.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <Link
      href={`/user/settings/${userId}/appointments/${id}`}
      className="rounded-3xl border flex justify-between items-center gap-3 px-2 py-1 hover:shadow-md"
    >
      <div className="flex items-center gap-3">
        {" "}
        <div className="flex items-center justify-between">
          <div
            className={`flex w-9 h-9 items-center justify-center rounded-full bg-muted p-2`}
          >
            <User />
          </div>
        </div>
        <div className="">
          <h2 className="text-sm font-semibold leading-none">
            {fullName} {surname}
          </h2>
          <div className="flex flex-row gap-3 text-xs">
            <div>
              Weeks: <b>{pregnancyWeeks}</b>
            </div>
            <div>
              Date: <b>{formattedDate}</b>
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-3">
        <Badge variant="outline">{status}</Badge>
        <IconChevronRight />
      </div>
    </Link>
  );
};

export default AppointmentDetails;
