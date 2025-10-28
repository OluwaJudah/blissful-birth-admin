import { defaultMedicalHistoryData } from "@/definitions/mother-info";
import { getMedicalHistory } from "@/data/mother-info";
import { MedicalHistoryFormClient } from "./client-form";

const MedicalHistoryForm = async ({ id }: { id: string }) => {
  let medicalHistory = defaultMedicalHistoryData;
  const data = await getMedicalHistory(id);
  if (data) medicalHistory = data;

  return (
    <MedicalHistoryFormClient medicalHistory={medicalHistory} userId={id} />
  );
};

export default MedicalHistoryForm;
