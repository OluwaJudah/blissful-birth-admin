import { Badge } from "@/components/ui/badge";
import { IconReceiptDollar } from "@tabler/icons-react";
import { PaymentHistoryActions } from "./payment-history-actions";

const PaymentEntry = ({
  type,
  amount,
  createdAt,
}: {
  type: string;
  amount: string;
  createdAt: Date;
}) => {
  const paymentObj: any = {
    consultation: "Consultation Fee",
    "birthing-unit": "Birthing Unit",
  };

  const date = createdAt.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

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
          <h2 className="font-semibold">{paymentObj[type]}</h2>
          <p className="text-xs text-gray-500 leading-none">{date}</p>
        </div>
      </div>
      <div className="flex gap-3">
        <Badge variant="outline">R {amount}</Badge>
        <PaymentHistoryActions />
      </div>
    </div>
  );
};

export default PaymentEntry;
