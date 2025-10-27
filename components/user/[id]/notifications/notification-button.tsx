"use client";
import { IconPlus } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";

export function NotificationPrimaryButton() {
  return (
    <div className="flex gap-2">
      <Button className="space-x-1" onClick={() => console.log("")}>
        <span>Create</span> <IconPlus size={18} />
      </Button>
    </div>
  );
}
