import ContentSection from "@/components/user/settings/medical-history/content-section";
import { BloodResultsForm } from "@/components/user/settings/blood-results/blood-results-form";
import { defaultBloodResultsData } from "@/definitions/mother-info";
import { getBloodResult } from "@/data/mother-info";

export default async function BloodResults({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  let bloodResults = defaultBloodResultsData;
  const data = await getBloodResult(id);
  if (data) bloodResults = data;

  return (
    <ContentSection
      title="Blood Results"
      desc="Manage the patient's blood results here."
    >
      <BloodResultsForm bloodResult={bloodResults} userId={id} />
    </ContentSection>
  );
}
