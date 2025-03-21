import ContentSection from "@/components/user/settings/components/content-section";
import { DisplayForm } from "@/components/user/settings/components/display-form";

export default function SettingsDisplay() {
  return (
    <ContentSection
      title="Display"
      desc="Turn items on or off to control what's displayed in the app."
    >
      <DisplayForm />
    </ContentSection>
  );
}
