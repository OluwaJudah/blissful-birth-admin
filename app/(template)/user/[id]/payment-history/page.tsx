import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import UsersProvider from "@/components/user/[id]/payment-history/context/users-context";
import PaymentList from "@/components/user/[id]/payment-history/list";
import { PaymentPrimaryButton } from "@/components/user/[id]/payment-history/payment-button";
import { UsersDialogs } from "@/components/user/[id]/payment-history/users-dialogs";
import { Suspense } from "react";

export default async function PaymentHistory({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

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
          <Suspense fallback={<>Loading...</>}>
            <PaymentList id={id} />
          </Suspense>
        </ScrollArea>
        <UsersDialogs userId={id} />
      </div>
    </UsersProvider>
  );
}
