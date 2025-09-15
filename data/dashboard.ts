import dbConnect from "@/lib/db";
import Appointment from "@/models/appointment";
import MotherInfo from "@/models/mother-info";

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

  return {
    totalPatients,
    activeClients,
    newPatientIntake,
    totalAppointments,
    revenue,
    mothersDueThisMonth,
  };
}
