import { ScrollArea } from "@/components/ui/scroll-area";
import ProfileTabs from "@/components/user/settings/components/profile-tabs";

export default async function SettingsProfile({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="flex flex-1 flex-col">
      <ScrollArea className="faded-bottom -mx-4 flex-1 scroll-smooth px-4 md:pb-16">
        <ProfileTabs userId={id} />
      </ScrollArea>
    </div>
  );
}
