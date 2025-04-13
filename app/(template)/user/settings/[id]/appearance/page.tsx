import { AppearanceForm } from "@/components/user/settings/components/appearance-form";
import ContentSection from "@/components/user/settings/components/content-section";

export default function SettingsAppearance() {
  return (
    <ContentSection
      title='Appearance'
      desc='Customize the appearance of the app. Automatically switch between day
          and night themes.'
    >
      <AppearanceForm />
    </ContentSection>
  )
}
