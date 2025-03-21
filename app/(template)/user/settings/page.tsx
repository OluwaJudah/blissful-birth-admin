import ContentSection from "@/components/user/settings/components/content-section";
import ProfileForm from "@/components/user/settings/components/profile-form";

export default function SettingsProfile() {
  return (
    <ContentSection
      title='Profile'
      desc='This is how others will see you on the site.'
    >
      <ProfileForm />
    </ContentSection>
  )
}
