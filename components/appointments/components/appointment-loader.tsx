import { LoaderCircle } from "lucide-react";

const AppointmentLoader = () => (
  <div className="w-full">
    <LoaderCircle size={30} className="animate-spin mx-auto" />
  </div>
);

export default AppointmentLoader;
