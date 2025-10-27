import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import ProfileTabs from "@/components/user/[id]/profile/profile-tabs";
import { getMotherDetails } from "@/data/mother-info";
import UsersProvider from "@/components/user/[id]/profile/context/users-context";
import { UsersDialogs } from "@/components/user/[id]/profile/users-dialogs";
import { EditProfileButton } from "@/components/user/[id]/profile/edit-profile-button";
import { ProfileOptionsDropdown } from "@/components/user/[id]/profile/profile-options-dropdown";

export default async function SettingsProfile({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const motherInfo = await getMotherDetails(id);
  if (!motherInfo) return null;

  const {
    age,
    g,
    p,
    packageType,
    lastMenstrualDate,
    scanDate,
    scanGestationalAge,
    fullName,
    surname,
  } = motherInfo;

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
      <UsersDialogs
        name={fullName + " " + surname}
        motherInfoData={{
          userId: id,
          age: age || 0,
          g: g || 0,
          p: p || 0,
          packageType: packageType || "",
          lastMenstrualDate: lastMenstrualDate || null,
          scanDate: scanDate || null,
          scanGestationalAge: scanGestationalAge || "",
        }}
      />
    </UsersProvider>
  );
}
