import dbConnect from "@/lib/db";
import Appointment from "@/models/appointment";
import MotherInfo from "@/models/mother-info";

export const topNav = [
  {
    title: "Overview",
    href: "dashboard/overview",
    isActive: true,
    disabled: false,
  },
  {
    title: "Customers",
    href: "dashboard/customers",
    isActive: false,
    disabled: true,
  },
  {
    title: "Products",
    href: "dashboard/products",
    isActive: false,
    disabled: true,
  },
  {
    title: "Settings",
    href: "dashboard/settings",
    isActive: false,
    disabled: true,
  },
];

export const patientsDue = [
  { id: 1, name: "Sarah M.", dueDate: "2025-08-21" },
  { id: 2, name: "Jane D.", dueDate: "2025-08-24" },
  { id: 3, name: "Emily K.", dueDate: "2025-08-28" },
];

export async function getKpiData() {
  await dbConnect();

  const now = new Date();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // 1. Total Patients
  const totalPatients = await MotherInfo.countDocuments();

  // 2. Active Clients (status !== "closed")
  const activeClients = await MotherInfo.countDocuments({
    status: { $ne: "closed" },
  });

  // 3. New Patient Intake: from first Tuesday of previous month to today
  const firstOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const dayOfWeek = firstOfLastMonth.getDay(); // 0=Sun..6=Sat
  const offsetToTuesday = (2 - dayOfWeek + 7) % 7; // 2 = Tuesday
  const firstTuesdayLastMonth = new Date(
    firstOfLastMonth.getFullYear(),
    firstOfLastMonth.getMonth(),
    firstOfLastMonth.getDate() + offsetToTuesday
  );
  firstTuesdayLastMonth.setHours(0, 0, 0, 0);

  const newPatientIntake = await MotherInfo.countDocuments({
    createdAt: { $gte: firstTuesdayLastMonth, $lte: now },
  });

  // 4. Total Upcoming Appointments
  const totalAppointments = await Appointment.countDocuments({
    date: { $gte: today },
  });

  // 5. Revenue (sum of appointment payments – placeholder example)
  const revenueAgg = await Appointment.aggregate([
    { $match: { date: { $gte: today } } },
    { $group: { _id: null, total: { $sum: "$paymentAmount" } } },
  ]);
  const revenue = `R ${revenueAgg[0]?.total?.toLocaleString() || "0"}`;

  // 6. Mothers Due This Month
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const endOfMonth = new Date(
    now.getFullYear(),
    now.getMonth() + 1,
    0,
    23,
    59,
    59,
    999
  );
  const mothersDueThisMonth = await MotherInfo.countDocuments({
    edd: { $gte: startOfMonth, $lte: endOfMonth },
  });

  // 7. Update patients without future appointments to "closed"
  const futureAppointments = await Appointment.distinct("userId", {
    date: { $gte: today },
  });

  await MotherInfo.updateMany(
    { userId: { $nin: futureAppointments } },
    { $set: { status: "closed" } }
  );

  return {
    totalPatients,
    activeClients,
    newPatientIntake,
    totalAppointments,
    revenue,
    mothersDueThisMonth,
  };
}
