import { MedicalHistoryForm } from "@/components/user/settings/medical-history/medical-history-form";
import ContentSection from "@/components/user/settings/medical-history/content-section";
import { getMedicalHistory } from "@/data/mother-info";
import { defaultMedicalHistoryData } from "@/definitions/mother-info";

export default async function MedicalHistory({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  let medicalHistory = defaultMedicalHistoryData;
  const data = await getMedicalHistory(id);
  if (data) medicalHistory = data;

  return (
    <ContentSection
      title="Medical History"
      desc="Manage the patient's medical history."
    >
      <MedicalHistoryForm medicalHistory={medicalHistory} userId={id} />
    </ContentSection>
  );
}
