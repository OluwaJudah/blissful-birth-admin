import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { PaymentPrimaryButton } from "@/components/user/settings/payment-history/payment-button";
import PaymentEntry from "@/components/user/settings/payment-history/PaymentEntry";

export default function SettingsAccount() {
  return (
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
        <div className="-mx-1 px-1.5 flex flex-col gap-3 lg:max-w-xl">
          <PaymentEntry />
          <PaymentEntry />
          <PaymentEntry />
        </div>
      </ScrollArea>
    </div>
  );
}
