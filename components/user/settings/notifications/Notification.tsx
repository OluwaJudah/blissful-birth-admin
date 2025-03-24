import { Badge } from "@/components/ui/badge";
import { IconArrowsDiagonal, IconBellRinging2 } from "@tabler/icons-react";

const Notification = () => {
  return (
    <div className="rounded-lg border flex justify-between items-center gap-3 p-4 hover:shadow-md">
      <div className="flex items-center gap-3">
        {" "}
        <div className="flex items-center justify-between">
          <div
            className={`flex size-10 items-center justify-center rounded-lg bg-muted p-2`}
          >
            <IconBellRinging2 />
          </div>
        </div>
        <div className="flex flex-col">
          <h2 className="font-semibold">Booking Notification</h2>
          <p className="text-xs text-gray-500 leading-none">02 Jan 2025</p>
        </div>
      </div>
      <div className="flex gap-3">
        <Badge variant="outline">Pending</Badge>
        <IconArrowsDiagonal />
      </div>
    </div>
  );
};

export default Notification;
