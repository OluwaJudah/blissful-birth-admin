import { Badge } from "@/components/ui/badge";
import { IconChevronRight } from "@tabler/icons-react";
import { User } from "lucide-react";
import Link from "next/link";
import React from "react";

const AppointmentDetails = ({
  _id,
  userId,
  date,
  time,
  firstname,
  surname,
}: {
  _id: string;
  userId: string;
  date: string;
  time: string;
  firstname: string;
  surname: string;
}) => {
  return (
    <Link
      href={`/user/settings//appointments/1`}
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
            {firstname} {surname}
          </h2>
          <div className="flex flex-row gap-3 text-xs">
            <div>Weeks: 8</div>
            <div>Due Date: {date}</div>
          </div>
        </div>
      </div>
      <div className="flex gap-3">
        {" "}
        <Badge variant="outline">Pending</Badge>
        <IconChevronRight />
      </div>
    </Link>
  );
};

export default AppointmentDetails;
