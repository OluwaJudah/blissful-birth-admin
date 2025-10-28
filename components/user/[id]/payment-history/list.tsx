import { fetchPaymentEntry } from "@/data/payment-history";
import PaymentEntry from "./PaymentEntry";

const PaymentList = async ({ id }: { id: string }) => {
  const paymentEntries = await fetchPaymentEntry(id);

  return (
    <div className="-mx-1 px-1.5 flex flex-col gap-2 lg:max-w-xl">
      {paymentEntries && paymentEntries.length > 0 ? (
        paymentEntries?.map(({ id, type, amount, createdAt }) => (
          <PaymentEntry
            key={id}
            id={id}
            type={type}
            amount={amount}
            createdAt={createdAt}
          />
        ))
      ) : (
        <div className="w-full text-center">No Payment Entry Available</div>
      )}
    </div>
  );
};

export default PaymentList;
