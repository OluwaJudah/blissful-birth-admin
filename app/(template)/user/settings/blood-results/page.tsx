import ContentSection from "@/components/user/settings/medical-history/content-section";
import { BloodResultsForm } from "@/components/user/settings/blood-results/blood-results-form";

export default function BloodResults() {
  return (
    <ContentSection
      title="Blood Results"
      desc="Manage the patient's blood results here."
    >
      <BloodResultsForm />
    </ContentSection>
  );
}
