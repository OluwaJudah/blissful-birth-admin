import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const AppointmentStatusButtons = ({ status, stats, filterByStatus }: any) => {
  const statusArr = [
    { name: "All", data: stats.all, value: "all" },
    { name: "Pending", data: stats.pending, value: "pending" },
    { name: "Confirmed", data: stats.confirmed, value: "confirmed" },
    { name: "Completed", data: stats.completed, value: "completed" },
  ];

  return (
    <div className="flex flex-col items-start gap-2">
      <div className="text-sm font-medium">Filter Status:</div>
      <div className="flex flex-row items-center gap-3">
        {statusArr.map((s) => (
          <Button
            key={s.value}
            type="button"
            onClick={() => filterByStatus(s.value)}
            className={
              status === s.value
                ? ""
                : "border-2 border-gray bg-white text-black hover:bg-gray-200"
            }
          >
            {s.name}{" "}
            <Badge className={status === s.value ? "bg-white text-black" : ""}>
              {s.data}
            </Badge>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default AppointmentStatusButtons;
