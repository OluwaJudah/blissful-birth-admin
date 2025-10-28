import ContentSection from "@/components/user/[id]/medical-history/content-section";
import { Suspense } from "react";
import BloodResultForm from "@/components/user/[id]/blood-results/form";

export default async function BloodResults({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <ContentSection
      title="Blood Results"
      desc="Manage the patient's blood results here."
    >
      <Suspense fallback={<>Loading...</>}>
        <BloodResultForm id={id} />
      </Suspense>
    </ContentSection>
  );
}
