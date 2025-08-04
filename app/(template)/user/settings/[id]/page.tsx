import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import ProfileTabs from "@/components/user/settings/profile/profile-tabs";
import { getMotherDetails } from "@/data/mother-info";
import UsersProvider from "@/components/user/settings/profile/context/users-context";
import { UsersDialogs } from "@/components/user/settings/profile/users-dialogs";
import { EditProfileButton } from "@/components/user/settings/profile/edit-profile-button";

export default async function SettingsProfile({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const motherInfo = await getMotherDetails(id);
  if (!motherInfo) return null;

  const { age, g, p, packageType } = motherInfo;

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
          </div>
        </div>
        <Separator className="my-4 flex-none" />
        <ScrollArea className="faded-bottom -mx-4 flex-1 scroll-smooth px-4 md:pb-16">
          <ProfileTabs userId={id} />
        </ScrollArea>
      </div>
      <UsersDialogs
        userId={id}
        age={age || 0}
        g={g || 0}
        p={p || 0}
        packageType={packageType || ""}
      />
    </UsersProvider>
  );
}
