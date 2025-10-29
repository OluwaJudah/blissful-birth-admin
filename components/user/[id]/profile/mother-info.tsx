import { getCheckList, getMotherDetails } from "@/data/mother-info";
import {
  PATIENT_CLOSED,
  PATIENT_ONBOARDED,
  PATIENT_PENDING,
} from "@/constants/appointment";
import CheckList from "./check-list";

const MotherInfo = async ({ userId }: { userId: string }) => {
  const mother = await getMotherDetails(userId);
  const checklist = await getCheckList(userId);

  if (!mother) return null;

  const {
    _id,
    fullName,
    surname,
    maidenName,
    status,
    idPassportNo,
    dateOfBirth,
    lastMenstrualDate,
    edd,
    age,
    g,
    p,
    bmi,
    contactNumber,
    email,
    countryOfOrigin,
    occupation,
    packageType,
  } = mother;

  let eddStr = "N/A";
  if (edd) {
    const date = new Date(edd);
    eddStr = date.toDateString();
  }
  const statusMap = {
    [PATIENT_CLOSED]: "Closed",
    [PATIENT_ONBOARDED]: "Onboarded",
    [PATIENT_PENDING]: "Pending",
  };
  const packageTypeMap = {
    anc: "Antenatal",
    full: "Full Package",
  };

  const statusStr = statusMap[status as keyof typeof statusMap] || "N/A";
  const packageTypeStr =
    packageTypeMap[packageType as keyof typeof packageTypeMap] || "N/A";

  const InfoDiv = ({ title, value }: { title: string; value?: string }) => {
    const displayValue =
      value === undefined ||
      value === null ||
      value === "" ||
      value === "undefined"
        ? "N/A"
        : String(value);

    return (
      <div className="flex flex-col">
        <div className="text-sm font-bold">{title}</div>
        <div className="break-words">{displayValue}</div>
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-4 gap-x-6">
      <InfoDiv title="Full Name" value={fullName} />
      <InfoDiv title="Surname" value={surname} />
      <InfoDiv title="Maiden Name" value={maidenName} />
      <InfoDiv title="ID / Passport" value={idPassportNo} />
      <InfoDiv title="Date of Birth" value={dateOfBirth?.toDateString()} />
      <InfoDiv title="Contact Number" value={contactNumber} />
      <InfoDiv title="Email Address" value={email} />
      <InfoDiv title="Country Of Origin" value={countryOfOrigin} />
      <InfoDiv title="Occupation" value={occupation} />
      <InfoDiv
        title="Last Menstrual Cycle"
        value={lastMenstrualDate?.toDateString()}
      />
      <InfoDiv title="Expected Delivery Date (EDD)" value={eddStr} />
      <InfoDiv title="Age" value={age + ""} />
      <InfoDiv title="BMI" value={bmi + ""} />
      <InfoDiv title="G" value={g + ""} />
      <InfoDiv title="P" value={p + ""} />
      <InfoDiv title="Package Type" value={packageTypeStr} />
      <InfoDiv title="Status" value={statusStr} />

      {/* Full-width Registration Link */}
      {/* <div className="col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4 flex flex-col">
        <div className="text-sm font-bold">Registration Link:</div>
        <div className="break-words">
          https://blissful-birth.vercel.app/register?id={userId}
        </div>
      </div> */}

      <CheckList
        userId={userId!}
        checklist={JSON.parse(JSON.stringify(checklist))}
      />
    </div>
  );
};

export default MotherInfo;
