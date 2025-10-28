import Link from "next/link";
import { ScanActions } from "./actions";
import { IScan } from "@/definitions/motherinfo";

const ScanEntry = ({ scan }: { scan: IScan }) => {
  const date = new Date(scan.date).toLocaleDateString();
  return (
    <Link href="">
      <div className="rounded-lg border flex justify-between items-center py-1 px-3 hover:shadow-md">
        <div className="flex flex-col">
          <div className="flex flex-row gap-1">
            <h2 className="font-semibold">Scan Gestation: </h2>
            <p>{scan.scan_gestation}</p>
          </div>
          <div className="flex space-x-4">
            <p className="text-sm text-gray-500">Scan Date: {date}</p>
            <p className="text-sm text-gray-500">
              Gestation Age: {scan.gestational_age}
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <ScanActions scan={scan} />
        </div>
      </div>
    </Link>
  );
};

export default ScanEntry;
