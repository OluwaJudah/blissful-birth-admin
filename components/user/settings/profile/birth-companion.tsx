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
      <div className="grid grid-cols-4 gap-y-4 gap-x-8 h-[240px]">
        <div className="">
          <div className="text-sm font-bold">Full Name</div>
          <div className="">{fullName}</div>
        </div>
        <div className="">
          <div className="text-sm font-bold">Surname</div>
          <div className="">{surname}</div>
        </div>
        <div className="">
          <div className="text-sm font-bold">Maiden Name</div>
          <div className="">{maidenName || "N/A"}</div>
        </div>
        <div className="">
          <div className="text-sm font-bold">ID / Passport</div>
          <div className="">{idPassportNo}</div>
        </div>
        <div className="">
          <div className="text-sm font-bold">Date of Birth</div>
          <div className="">{dateOfBirth.toDateString()}</div>
        </div>
        <div className="">
          <div className="text-sm font-bold">Contact Number</div>
          <div className="">{contactNumber}</div>
        </div>
        <div className="">
          <div className="text-sm font-bold">Email Address</div>
          <div className="">{email || "N/A"}</div>
        </div>
        <div className="">
          <div className="text-sm font-bold">Country Of Origin</div>
          <div className="">{countryOfOrigin}</div>
        </div>
        <div className="">
          <div className="text-sm font-bold">Occupation</div>
          <div className="">{occupation || "N/A"}</div>
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
          <div className="">
            <div className="text-sm font-bold">Full Name</div>
            <div className="">{babyInfo.fullName || "N/A"}</div>
          </div>
          <div className="">
            <div className="text-sm font-bold">Surname</div>
            <div className="">{babyInfo.surname || "N/A"}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BirthCompanion;
