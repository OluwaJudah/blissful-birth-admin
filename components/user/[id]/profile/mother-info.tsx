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

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-4 gap-x-6">
      <div className="flex flex-col">
        <div className="text-sm font-bold">Full Name</div>
        <div className="break-words">{fullName}</div>
      </div>
      <div className="flex flex-col">
        <div className="text-sm font-bold">Surname</div>
        <div className="break-words">{surname}</div>
      </div>
      <div className="flex flex-col">
        <div className="text-sm font-bold">Maiden Name</div>
        <div className="break-words">{maidenName || "N/A"}</div>
      </div>
      <div className="flex flex-col">
        <div className="text-sm font-bold">ID / Passport</div>
        <div className="break-words">{idPassportNo || "N/A"}</div>
      </div>
      <div className="flex flex-col">
        <div className="text-sm font-bold">Date of Birth</div>
        <div className="break-words">
          {dateOfBirth?.toDateString() || "N/A"}
        </div>
      </div>
      <div className="flex flex-col">
        <div className="text-sm font-bold">Contact Number</div>
        <div className="break-words">{contactNumber || "N/A"}</div>
      </div>
      <div className="flex flex-col">
        <div className="text-sm font-bold">Email Address</div>
        <div className="break-words">{email || "N/A"}</div>
      </div>
      <div className="flex flex-col">
        <div className="text-sm font-bold">Country Of Origin</div>
        <div className="break-words">{countryOfOrigin || "N/A"}</div>
      </div>
      <div className="flex flex-col">
        <div className="text-sm font-bold">Occupation</div>
        <div className="break-words">{occupation || "N/A"}</div>
      </div>
      <div className="flex flex-col">
        <div className="text-sm font-bold">Last Menstrual Cycle</div>
        <div className="break-words">
          {lastMenstrualDate?.toDateString() || "N/A"}
        </div>
      </div>
      <div className="flex flex-col">
        <div className="text-sm font-bold">Expected Delivery Date (EDD)</div>
        <div className="break-words">{eddStr || "N/A"}</div>
      </div>
      <div className="flex flex-col">
        <div className="text-sm font-bold">Age</div>
        <div className="break-words">{age || "N/A"}</div>
      </div>
      <div className="flex flex-col">
        <div className="text-sm font-bold">G</div>
        <div className="break-words">{g || "N/A"}</div>
      </div>
      <div className="flex flex-col">
        <div className="text-sm font-bold">P</div>
        <div className="break-words">{p || "N/A"}</div>
      </div>
      <div className="flex flex-col">
        <div className="text-sm font-bold">Package Type</div>
        <div className="break-words">{packageTypeStr}</div>
      </div>
      <div className="flex flex-col">
        <div className="text-sm font-bold">Status</div>
        <div className="break-words">{statusStr}</div>
      </div>

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
