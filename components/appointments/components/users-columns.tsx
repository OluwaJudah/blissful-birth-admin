"use client";
import { ColumnDef } from "@tanstack/react-table";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import LongText from "@/components/long-text";
import { callTypes, serviceTypes, userTypes } from "../data/data";
import { User } from "../data/schema";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";

export const columns: ColumnDef<User>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    meta: {
      className: cn(
        "sticky md:table-cell left-0 z-10 rounded-tl",
        "bg-background transition-colors duration-200 group-hover/row:bg-muted group-data-[state=selected]/row:bg-muted"
      ),
    },
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "username",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Username" />
    ),
    cell: ({ row }) => (
      <LongText className="max-w-36">{row.getValue("username")}</LongText>
    ),
    meta: {
      className: cn(
        "drop-shadow-[0_1px_2px_rgb(0_0_0_/_0.1)] dark:drop-shadow-[0_1px_2px_rgb(255_255_255_/_0.1)] lg:drop-shadow-none",
        "bg-background transition-colors duration-200 group-hover/row:bg-muted group-data-[state=selected]/row:bg-muted",
        "sticky left-6 md:table-cell",
        "basis-1/5"
      ),
    },
    enableHiding: false,
  },
  {
    id: "fullName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => {
      const { firstName, lastName } = row.original;
      const fullName = `${firstName} ${lastName}`;
      return <LongText className="max-w-36">{fullName}</LongText>;
    },
    meta: { className: "basis-1/5" },
  },
  {
    id: "serviceType",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Service Type" />
    ),
    cell: ({ row }) => {
      const { serviceType } = row.original;
      const value = serviceTypes.get(serviceType);

      return <LongText className="max-w-36">{value}</LongText>;
    },
    meta: { className: "basis-1/5" },
  },
  {
    id: "scheduledAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Scheduled Date" />
    ),
    cell: ({ row }) => {
      const { scheduledAt } = row.original;
      const date = scheduledAt.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });

      return <LongText className="max-w-36">{date}</LongText>;
    },
    meta: { className: "basis-1/5" },
  },
  {
    id: "scheduledTime",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Scheduled Time" />
    ),
    cell: ({ row }) => {
      const { scheduledTime } = row.original;
      const time = scheduledTime.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
      });
      return <LongText className="max-w-36">{time}</LongText>;
    },
    meta: { className: "basis-1/5" },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const { status } = row.original;
      const badgeColor = callTypes.get(status);
      return (
        <div className="flex space-x-2">
          <Badge variant="outline" className={cn("capitalize", badgeColor)}>
            {row.getValue("status")}
          </Badge>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    enableHiding: false,
    enableSorting: false,
  },
  {
    id: "actions",
    cell: DataTableRowActions,
  },
];
