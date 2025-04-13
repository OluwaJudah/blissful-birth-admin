import { AccountForm } from "@/components/user/settings/components/account-form";
import ContentSection from "@/components/user/settings/components/content-section";

export default function SettingsProfile() {
  return (
    <ContentSection
      title="Profile"
      desc="This is how others will see you on the site."
    >
      <AccountForm />
    </ContentSection>
  );
}
