"use client";
import { LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { getNotificationsForFilter } from "@/data/notification";
import NotificationDetails from "./notification-details";

const NotificationsDateFilter = ({
  notifications,
}: {
  notifications: any[];
}) => {
  const today = new Date();
  today.setDate(today.getDate() - 1);
  const dateStr = today.toISOString().split("T")[0];
  today.setDate(today.getDate() + 8);
  const thirtyDayStr = today.toISOString().split("T")[0];

  const [fromDate, setFromDate] = useState(dateStr);
  const [toDate, setToDate] = useState(thirtyDayStr);
  const [isLoading, setIsLoading] = useState(false);
  const [notificationsData, setNotificationsData] = useState<any[]>([]);
  const [filteredNotificationsData, setfilteredNotificationsData] = useState<
    any[]
  >([]);

  useEffect(() => {
    setNotificationsData(notifications);
    setfilteredNotificationsData(notifications);
  }, []);

  const onChangeFromDate = async (e: any) => {
    const fromDate = e.target.value;
    setFromDate(fromDate);

    setIsLoading(true);
    const notifications = await getNotificationsForFilter(fromDate);
    setNotificationsData(notifications);
    setfilteredNotificationsData(notifications);
    setIsLoading(false);
  };

  const onChangeToDate = async (e: any) => {
    const toDate = e.target.value;
    setToDate(toDate);

    setIsLoading(true);
    const notifications = await getNotificationsForFilter(fromDate, toDate);
    setNotificationsData(notifications);
    setfilteredNotificationsData(notifications);
    setIsLoading(false);
  };

  const onChangeFilterUser = async (e: any) => {
    const search = e.target.value.toLowerCase();

    const filteredNotifications = notifications.filter((n) => {
      const fullName = n.fullName?.toLowerCase() || "";
      const surname = n.surname?.toLowerCase() || "";
      return fullName.includes(search) || surname.includes(search);
    });

    setfilteredNotificationsData(filteredNotifications);
  };

  const clearFilter = () => {
    setIsLoading(false);
    setToDate("");
    setFromDate("");
  };

  return (
    <>
      <div className="flex flex-row items-center gap-8 mb-2 border border-gray-200 p-4 rounded-xl w-full">
        <div className="flex flex-col gap-1">
          <div className="text-sm font-medium">Choose Date Range:</div>
          <div className="flex flex-row gap-8">
            <div className="flex flex-row items-center gap-3">
              <div className="text-sm font-medium">From:</div>
              <Input
                placeholder="Filter apps..."
                className="w-[200px] flex flex-col justify-center"
                defaultValue={fromDate}
                type="date"
                onChange={onChangeFromDate}
                onClick={clearFilter}
              />
            </div>
            <div className="flex flex-row items-center gap-3">
              <div className="text-sm font-medium">To:</div>
              <Input
                placeholder="Filter apps..."
                className="w-[200px] flex flex-col justify-center"
                defaultValue={toDate}
                type="date"
                min={fromDate}
                disabled={!fromDate}
                onChange={onChangeToDate}
              />
            </div>
            <div className="flex flex-row items-center gap-3">
              <div className="text-sm font-medium">Filter User:</div>
              <Input
                placeholder="Filter users..."
                className="w-[200px] flex flex-col justify-center"
                onChange={onChangeFilterUser}
              />
            </div>
          </div>
        </div>
      </div>
      {isLoading && (
        <div className="w-full">
          <LoaderCircle size={30} className="animate-spin mx-auto" />
        </div>
      )}
      <div className="flex flex-col gap-2">
        {filteredNotificationsData.map((a) => (
          <NotificationDetails key={a._id} {...{ ...a }} />
        ))}
      </div>
    </>
  );
};

export default NotificationsDateFilter;
