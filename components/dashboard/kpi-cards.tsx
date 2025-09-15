import React from "react";
import KpiCard from "./kpi-card";
import {
  Calendar,
  CheckCircle,
  ClipboardList,
  DollarSign,
  User,
} from "lucide-react";
import { IconUsersGroup } from "@tabler/icons-react";

const KpiCards = ({ kpiData }: { kpiData: any }) => {
  const {
    totalPatients,
    activeClients,
    newPatientIntake,
    totalAppointments,
    revenue,
    mothersDueThisMonth,
  } = kpiData;

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <KpiCard title="Total Patients" value={totalPatients} icon={<User />} />
      <KpiCard
        title="Active Client"
        value={activeClients}
        icon={<IconUsersGroup />}
      />
      <KpiCard
        title="New Patient Intake"
        value={newPatientIntake}
        icon={<ClipboardList />}
      />
      <KpiCard
        title="Upcoming Appointments"
        value={totalAppointments}
        icon={<Calendar />}
      />
      <KpiCard title="Revenue" value={revenue} icon={<DollarSign />} />
      <KpiCard
        title="Mothers Due This Month"
        value={mothersDueThisMonth}
        icon={<CheckCircle />}
      />
    </div>
  );
};

export default KpiCards;
