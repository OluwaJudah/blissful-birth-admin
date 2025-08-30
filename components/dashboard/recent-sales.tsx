"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const sales = [
  {
    name: "Olivia Martin",
    email: "olivia.martin@email.com",
    amount: "$1,999",
    avatar: "/avatars/01.png",
  },
  {
    name: "Jackson Lee",
    email: "jackson.lee@email.com",
    amount: "$39",
    avatar: "/avatars/02.png",
  },
  {
    name: "Isabella Nguyen",
    email: "isabella.nguyen@email.com",
    amount: "$299",
    avatar: "/avatars/03.png",
  },
  {
    name: "William Kim",
    email: "will@email.com",
    amount: "$99",
    avatar: "/avatars/04.png",
  },
  {
    name: "Sofia Davis",
    email: "sofia.davis@email.com",
    amount: "$39",
    avatar: "/avatars/05.png",
  },
];

export function RecentSalesList() {
  return (
    <div className="space-y-8">
      {sales.map((s, i) => (
        <div key={i} className="flex items-center gap-4">
          <Avatar className="h-9 w-9">
            <AvatarImage src={s.avatar} alt={s.name} />
            <AvatarFallback>
              {s.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-1 flex-wrap items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">{s.name}</p>
              <p className="text-sm text-muted-foreground">{s.email}</p>
            </div>
            <div className="font-medium">{s.amount}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
