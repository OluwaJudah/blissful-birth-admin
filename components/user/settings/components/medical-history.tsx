import { getMedicalHistory } from "@/data/mother-info";

const MedicalHistory = async ({ userId }: { userId: string }) => {
  const medicalHistory = await getMedicalHistory(userId);
  console.log({ medicalHistory });
  if (!medicalHistory) return null;

  const {
    details,
    medication,
    operations,
    allergies,
    conditions,
    familyHistory,
    tbSymptomsScreen,
  } = medicalHistory;

  return (
    <div className="grid grid-cols-4 gap-y-4 gap-x-8 h-[150px]">
      <div className="">
        <div className="text-sm font-bold">Conditions</div>
        <div className="">{conditions || "N/A"}</div>
      </div>
      <div className="">
        <div className="text-sm font-bold">Family History</div>
        <div className="">{familyHistory || "N/A"}</div>
      </div>
      <div className="">
        <div className="text-sm font-bold">Medications</div>
        <div className="">{medication || "N/A"}</div>
      </div>
      <div className="">
        <div className="text-sm font-bold">Operations</div>
        <div className="">{operations || "N/A"}</div>
      </div>
      <div className="">
        <div className="text-sm font-bold">Allergies</div>
        <div className="">{allergies || "N/A"}</div>
      </div>
      <div className="">
        <div className="text-sm font-bold">Details</div>
        <div className="">{details || "N/A"}</div>
      </div>
      <div className="">
        <div className="text-sm font-bold">TB Symptoms Screen</div>
        <div className="">{tbSymptomsScreen || "N/A"}</div>
      </div>
    </div>
  );
};

export default MedicalHistory;
