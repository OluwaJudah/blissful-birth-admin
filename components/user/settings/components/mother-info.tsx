import { getMotherDetails } from "@/data/mother-info";
import ClientPackage from "./client-package";

const MotherInfo = async ({ userId }: { userId: string }) => {
  const mother = await getMotherDetails(userId);
  if (!mother) return null;

  const {
    _id,
    fullName,
    surname,
    maidenName,
    idPassportNo,
    dateOfBirth,
    lastMenstrualDate,
    edd,
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

  return (
    <div className="grid grid-cols-4 gap-y-4 gap-x-8 h-[350px]">
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
        <div className="">{idPassportNo || "N/A"}</div>
      </div>
      <div className="">
        <div className="text-sm font-bold">Date of Birth</div>
        <div className="">{dateOfBirth?.toDateString() || "N/A"}</div>
      </div>
      <div className="">
        <div className="text-sm font-bold">Contact Number</div>
        <div className="">{contactNumber || "N/A"}</div>
      </div>
      <div className="">
        <div className="text-sm font-bold">Email Address</div>
        <div className="">{email || "N/A"}</div>
      </div>
      <div className="">
        <div className="text-sm font-bold">Country Of Origin</div>
        <div className="">{countryOfOrigin || "N/A"}</div>
      </div>
      <div className="">
        <div className="text-sm font-bold">Occupation</div>
        <div className="">{occupation || "N/A"}</div>
      </div>
      <div className="">
        <div className="text-sm font-bold">Last Menstrual Cycle</div>
        <div className="">{lastMenstrualDate?.toDateString() || "N/A"}</div>
      </div>
      <div className="">
        <div className="text-sm font-bold">Expected Delivery Date (EDD)</div>
        <div className="">{eddStr || "N/A"}</div>
      </div>
      <div className="col-span-4">
        <div className="w-2/3">
          <div className="text-sm font-bold">Registration Link: </div>
          <div>https://blissful-birth.vercel.app/regsiter/{userId}</div>
        </div>
      </div>
      <div className="col-span-4">
        <div className="w-1/3">
          <ClientPackage
            motherId={_id.toString()}
            packageType={packageType || ""}
          />
        </div>
      </div>
    </div>
  );
};

export default MotherInfo;
