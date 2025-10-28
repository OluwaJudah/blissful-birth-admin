import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import ProfileTabs from "@/components/user/[id]/profile/profile-tabs";
import { getMotherDetails } from "@/data/mother-info";
import UsersProvider from "@/components/user/[id]/profile/context/users-context";
import { EditProfileButton } from "@/components/user/[id]/profile/edit-profile-button";
import { ProfileOptionsDropdown } from "@/components/user/[id]/profile/profile-options-dropdown";
import UsersDialogs from "@/components/user/[id]/profile/user-dialog";
import { Suspense } from "react";

export default async function SettingsProfile({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <UsersProvider>
      <div className="flex flex-1 flex-col">
        <div className="flex justify-between">
          <div className="flex-none">
            <h3 className="text-lg font-medium">Profile</h3>
            <p className="text-sm text-muted-foreground">
              Manage patient profile data.
            </p>
          </div>
          <div className="flex gap-1">
            <EditProfileButton />
            <ProfileOptionsDropdown />
          </div>
        </div>
        <Separator className="my-4 flex-none" />
        <ScrollArea className="faded-bottom -mx-4 flex-1 scroll-smooth px-4 md:pb-16">
          <ProfileTabs userId={id} />
        </ScrollArea>
      </div>
      <Suspense>
        <UsersDialogs id={id} />
      </Suspense>
    </UsersProvider>
  );
}
