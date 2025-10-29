"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toggleCheckListItem } from "@/actions/check-list";

interface CheckListProps {
  userId: string;
  checklist: {
    datingScan: { status: boolean; completedAt?: string | null };
    anc: { status: boolean; completedAt?: string | null };
    week13: { status: boolean; completedAt?: string | null };
    birthPrep: { status: boolean; completedAt?: string | null };
    week21: { status: boolean; completedAt?: string | null };
  };
}

export default function CheckList({ userId, checklist }: CheckListProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleToggle = async (key: string) => {
    startTransition(async () => {
      await toggleCheckListItem(userId, key);
      router.refresh();
    });
  };

  const items = [
    { key: "datingScan", label: "Dating Scan" },
    { key: "anc", label: "ANC Visit" },
    { key: "week13", label: "Week 13 Visit" },
    { key: "birthPrep", label: "Birth Prep" },
    { key: "week21", label: "Week 21 Visit" },
  ];

  return (
    <div className="col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4 mt-1">
      <div className="font-semibold text-base mb-2">Appointment Checklist</div>

      <div className="text-sm text-gray-500 mb-4">
        Mark the completed scans and tests below.
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-y-3 gap-x-6">
        {items.map((item) => {
          const data = checklist[item.key as keyof typeof checklist];
          return (
            <div key={item.key}>
              <label key={item.key} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={data?.status || false}
                  onChange={() => handleToggle(item.key)}
                  disabled={isPending}
                  className="w-4 h-4 accent-turquoise-500 rounded-md focus:ring-turquoise-600"
                />
                <span className="text-sm font-medium break-words">
                  {item.label}
                </span>
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
}
