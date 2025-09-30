import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AppointmentStatusButtons = ({ status, stats, filterByStatus }: any) => {
  const statusArr = [
    { name: "All", data: stats.all, value: "all" },
    { name: "Pending", data: stats.pending, value: "pending" },
    { name: "Confirmed", data: stats.confirmed, value: "confirmed" },
    { name: "Completed", data: stats.completed, value: "completed" },
    { name: "Missed", data: stats.missed, value: "missed" },
  ];

  return (
    <div className="flex flex-col items-start gap-2">
      <div className="text-sm font-medium">Filter Status:</div>
      <div className="flex flex-row items-center gap-3">
        {/* Tabs Filter */}
        <Tabs value={status} onValueChange={filterByStatus} className="w-full">
          <TabsList>
            {statusArr.map((s) => (
              <TabsTrigger key={s.value} value={s.value}>
                {s.name} ({s.data || 0})
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
};

export default AppointmentStatusButtons;
