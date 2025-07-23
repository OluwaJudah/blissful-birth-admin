import {
  IconBarrierBlock,
  IconBrowserCheck,
  IconBug,
  IconCalendarEvent,
  IconChecklist,
  IconError404,
  IconHelp,
  IconLayoutDashboard,
  IconLock,
  IconLockAccess,
  IconMessages,
  IconNotification,
  IconPackages,
  IconPalette,
  IconServerOff,
  IconSettings,
  IconTool,
  IconUserCog,
  IconUserOff,
  IconUsers,
} from "@tabler/icons-react";
import { AudioWaveform, Command, GalleryVerticalEnd } from "lucide-react";
import { type SidebarData } from "../types";

export const sidebarData: SidebarData = {
  user: {
    name: "satnaing",
    email: "satnaingdev@gmail.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Blissful Birth",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
  ],
  navGroups: [
    {
      title: "General",
      items: [
        {
          title: "Clients",
          url: "/clients",
          icon: IconUsers,
        },
        {
          title: "Appointments",
          url: "/appointments",
          icon: IconCalendarEvent,
        },
        {
          title: "Notifications",
          url: "/notifications",
          icon: IconCalendarEvent,
        },
      ],
    },
  ],
};
