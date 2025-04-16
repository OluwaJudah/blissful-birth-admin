import {
  IconBellRinging2,
  IconCalendarEvent,
  IconCashRegister,
  IconNotification,
  IconReceiptDollar,
  IconTool,
  IconUser,
} from "@tabler/icons-react";
import { Separator } from "@/components/ui/separator";
import { Main } from "@/components/layout/main";
import SidebarNav from "@/components/user/settings/components/sidebar-nav";
import { Header } from "@/components/layout/header";
import { ProfileDropdown } from "@/components/profile-dropdown";
import { Search } from "@/components/search";
import { ThemeSwitch } from "@/components/theme-switch";

export default async function RootLayout({
  params,
  children,
}: Readonly<{
  params: Promise<{ id: string }>;
  children: React.ReactNode;
}>) {
  const { id } = await params;

  const sidebarNavItems = [
    {
      title: "Profile",
      icon: <IconUser size={18} />,
      href: `/user/settings/${id}`,
    },
    {
      title: "Appointments",
      icon: <IconCalendarEvent size={18} />,
      href: `/user/settings/${id}/appointments`,
    },
    {
      title: "Payment History",
      icon: <IconReceiptDollar size={18} />,
      href: `/user/settings/${id}/payment-history`,
    },
    {
      title: "Notifications",
      icon: <IconBellRinging2 size={18} />,
      href: `/user/settings/${id}/notifications`,
    },
  ];

  return (
    <>
      <Header>
        <Search />
        <div className="ml-auto flex items-center space-x-4">
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>
      <Main fixed>
        <div className="space-y-0.5">
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
            User Profile
          </h1>
          <p className="text-muted-foreground">
            Manage your account settings and set e-mail preferences.
          </p>
        </div>
        <Separator className="my-4 lg:my-6" />
        <div></div>
        <div className="flex flex-1 flex-col space-y-2 overflow-hidden md:space-y-2 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="top-0 lg:sticky lg:w-1/5">
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className="flex w-full overflow-y-hidden p-1 pr-4">
            {children}
          </div>
        </div>
      </Main>{" "}
    </>
  );
}
