import { getMotherDetails } from "@/data/mother-info";
import { UsersDialogsClient } from "./users-dialogs-client";

const UsersDialogs = async ({ id }: { id: string }) => {
  const motherInfo = await getMotherDetails(id);
  if (!motherInfo) return null;

  const {
    age,
    g,
    p,
    bmi,
    packageType,
    lastMenstrualDate,
    scanDate,
    scanGestationalAge,
    fullName,
    surname,
  } = motherInfo;

  return (
    <UsersDialogsClient
      name={fullName + " " + surname}
      motherInfoData={{
        userId: id,
        age: age || 0,
        g: g || 0,
        p: p || 0,
        bmi: bmi || 0,
        packageType: packageType || "",
        lastMenstrualDate: lastMenstrualDate || null,
        scanDate: scanDate || null,
        scanGestationalAge: scanGestationalAge || "",
      }}
    />
  );
};

export default UsersDialogs;
