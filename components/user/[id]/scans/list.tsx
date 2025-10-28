import { getScans } from "@/data/scan";
import ScanEntry from "./scan";

const ScanList = async ({ id }: { id: string }) => {
  const scans = (await getScans(id)) || [];

  return (
    <div className="-mx-1 px-1.5 flex flex-col gap-2 lg:max-w-xl">
      {scans.length > 0 ? (
        scans.map((scan) => (
          <ScanEntry
            key={scan.id}
            scan={{ ...scan, date: new Date(scan.date) }}
          />
        ))
      ) : (
        <p>No Baby Scan available...</p>
      )}
    </div>
  );
};

export default ScanList;
