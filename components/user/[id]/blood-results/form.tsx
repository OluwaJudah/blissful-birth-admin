import { defaultBloodResultsData } from "@/definitions/mother-info";
import { getBloodResult } from "@/data/mother-info";
import { BloodResultsFormClient } from "./blood-results-form";

const BloodResultForm = async ({ id }: { id: string }) => {
  let bloodResults = defaultBloodResultsData;
  const data = await getBloodResult(id);
  if (data) bloodResults = data;

  return <BloodResultsFormClient bloodResult={bloodResults} userId={id} />;
};

export default BloodResultForm;
