"use client";
import { ColumnDef } from "@tanstack/react-table";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import LongText from "@/components/long-text";
import { callTypes, serviceTypes, userTypes } from "../data/data";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { IAppointmentData } from "@/definitions/appointment";

export const columns: ColumnDef<IAppointmentData>[] = [
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
    id: "fullName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => {
      return (
        <LongText className="max-w-36">
          {row.original.fullName} {row.original.surname}
        </LongText>
      );
    },
    meta: { className: "basis-1/5" },
  },
  {
    id: "date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Schedule Date" />
    ),
    cell: ({ row }) => {
      return <LongText className="max-w-36">{row.original.date}</LongText>;
    },
    meta: { className: "basis-1/5" },
  },
  {
    id: "time",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Time Slot" />
    ),
    cell: ({ row }) => {
      return <LongText className="max-w-36">{row.original.time}</LongText>;
    },
    meta: { className: "basis-1/5" },
  },
  {
    id: "pregnancyWeeks",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Pregnancy Weeks" />
    ),
    cell: ({ row }) => {
      return (
        <LongText className="max-w-36">{row.original.pregnancyWeeks}</LongText>
      );
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
      const badgeColor = callTypes.get(status as any);
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
