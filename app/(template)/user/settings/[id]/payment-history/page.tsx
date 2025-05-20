import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import UsersProvider from "@/components/user/settings/payment-history/context/users-context";
import { PaymentPrimaryButton } from "@/components/user/settings/payment-history/payment-button";
import PaymentEntry from "@/components/user/settings/payment-history/PaymentEntry";
import { UsersDialogs } from "@/components/user/settings/payment-history/users-dialogs";
import { fetchPaymentEntry } from "@/data/payment-history";

export default async function PaymentHistory({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const paymentEntries = await fetchPaymentEntry(id);

  return (
    <UsersProvider>
      <div className="flex flex-1 flex-col">
        <div className="flex justify-between">
          <div className="flex-none">
            <h3 className="text-lg font-medium">Payment History</h3>
            <p className="text-sm text-muted-foreground">
              Update your account settings. Set your preferred language and
              timezone.
            </p>
          </div>
          <PaymentPrimaryButton />
        </div>
        <Separator className="my-4 flex-none" />
        <ScrollArea className="faded-bottom -mx-4 flex-1 scroll-smooth px-4 md:pb-16">
          <div className="-mx-1 px-1.5 flex flex-col gap-3 w-full">
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
        </ScrollArea>
        <UsersDialogs userId={id} />
      </div>
    </UsersProvider>
  );
}
