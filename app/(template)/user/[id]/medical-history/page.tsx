import ContentSection from "@/components/user/[id]/medical-history/content-section";
import MedicalHistoryForm from "@/components/user/[id]/medical-history/form";
import { Suspense } from "react";

export default async function MedicalHistory({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <ContentSection
      title="Medical History"
      desc="Manage the patient's medical history."
    >
      <Suspense fallback={<>Loading...</>}>
        <MedicalHistoryForm id={id} />
      </Suspense>
    </ContentSection>
  );
}
