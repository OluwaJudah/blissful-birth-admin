import { AccountForm } from "@/components/user/settings/components/account-form";
import ContentSection from "@/components/user/settings/components/content-section";

export default function SettingsAccount() {
  return (
    <ContentSection
      title='Account'
      desc='Update your account settings. Set your preferred language and
          timezone.'
    >
      <AccountForm />
    </ContentSection>
  )
}
