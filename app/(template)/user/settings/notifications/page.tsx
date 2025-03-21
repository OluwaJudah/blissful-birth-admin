import ContentSection from "@/components/user/settings/components/content-section";
import { NotificationsForm } from "@/components/user/settings/components/notifications-form";

export default function SettingsNotifications() {
  return (
    <ContentSection
      title="Notifications"
      desc="Configure how you receive notifications."
    >
      <NotificationsForm />
    </ContentSection>
  );
}
