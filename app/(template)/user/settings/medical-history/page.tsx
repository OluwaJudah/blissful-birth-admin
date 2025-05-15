import { MedicalHistoryForm } from "@/components/user/settings/medical-history/medical-history-form";
import ContentSection from "@/components/user/settings/medical-history/content-section";

export default function MedicalHistory() {
  return (
    <ContentSection
      title="Medical History"
      desc="Manage the patient's medical history."
    >
      <MedicalHistoryForm />
    </ContentSection>
  );
}
