import { Badge } from "@/components/ui/badge";
import { IconArrowsDiagonal, IconReceiptDollar } from "@tabler/icons-react";
import { PaymentHistoryActions } from "./payment-history-actions";

const PaymentEntry = () => {
  const paymentObj = {
    consultation: "Consultation Fee",
    "birthing-unit": "Birthing Unit",
  };

  return (
    <div className="rounded-lg border flex justify-between items-center gap-3 p-4 hover:shadow-md">
      <div className="flex items-center gap-3">
        {" "}
        <div className="flex items-center justify-between">
          <div
            className={`flex size-10 items-center justify-center rounded-lg bg-muted p-2`}
          >
            <IconReceiptDollar />
          </div>
        </div>
        <div className="flex flex-col">
          <h2 className="font-semibold">Consultation Fee</h2>
          <p className="text-xs text-gray-500 leading-none">02 Jan 2025</p>
        </div>
      </div>
      <div className="flex gap-3">
        <Badge variant="outline">R 280</Badge>
        <PaymentHistoryActions />
      </div>
    </div>
  );
};

export default PaymentEntry;
