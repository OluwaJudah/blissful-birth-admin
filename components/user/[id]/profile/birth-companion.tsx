import { getBabyInfo, getBirthCompanion } from "@/data/mother-info";

const BirthCompanion = async ({ userId }: { userId: string }) => {
  const birthCompanion = await getBirthCompanion(userId);
  const babyInfo = await getBabyInfo(userId);
  if (!birthCompanion || !babyInfo) return null;

  const {
    fullName,
    surname,
    maidenName,
    idPassportNo,
    dateOfBirth,
    contactNumber,
    email,
    countryOfOrigin,
    occupation,
  } = birthCompanion;

  return (
    <div className="h-[340px]">
      <div className="grid grid-cols-4 gap-y-4 gap-x-8 h-[200px] mb-3">
        <div className="break-words">
          <div className="text-sm font-bold">Full Name</div>
          <div className="break-words">{fullName}</div>
        </div>
        <div className="break-words">
          <div className="text-sm font-bold">Surname</div>
          <div className="break-words">{surname}</div>
        </div>
        <div className="break-words">
          <div className="text-sm font-bold">Maiden Name</div>
          <div className="break-words">{maidenName || "N/A"}</div>
        </div>
        <div className="break-words">
          <div className="text-sm font-bold">ID / Passport</div>
          <div className="break-words">{idPassportNo}</div>
        </div>
        <div className="break-words">
          <div className="text-sm font-bold">Date of Birth</div>
          <div className="break-words">{dateOfBirth.toDateString()}</div>
        </div>
        <div className="break-words">
          <div className="text-sm font-bold">Contact Number</div>
          <div className="break-words">{contactNumber}</div>
        </div>
        <div className="break-words">
          <div className="text-sm font-bold">Email Address</div>
          <div className="break-words">{email || "N/A"}</div>
        </div>
        <div className="break-words">
          <div className="text-sm font-bold">Country Of Origin</div>
          <div className="break-words">{countryOfOrigin}</div>
        </div>
        <div className="break-words">
          <div className="text-sm font-bold">Occupation</div>
          <div className="break-words">{occupation || "N/A"}</div>
        </div>
      </div>

      <div className="h-[100px]">
        <div className="mb-4">
          <div className="font-semibold text-base">Baby's Information</div>
          <div className="text-sm text-gray-500">
            View Mother's information details here according to the profile.
          </div>
        </div>
        <div className="grid grid-cols-4 gap-y-4 gap-x-8 h-[100px]">
          <div className="break-words">
            <div className="text-sm font-bold">Full Name</div>
            <div className="break-words">{babyInfo.fullName || "N/A"}</div>
          </div>
          <div className="break-words">
            <div className="text-sm font-bold">Surname</div>
            <div className="break-words">{babyInfo.surname || "N/A"}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BirthCompanion;
