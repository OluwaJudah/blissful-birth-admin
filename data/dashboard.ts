import dbConnect from "@/lib/db";
import Appointment from "@/models/appointment";
import MotherInfo from "@/models/mother-info";
import PaymentEntry from "@/models/payment-history";

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

  // 5. Revenue (sum of all payments in PaymentEntry)
  const revenueAgg = await PaymentEntry.aggregate([
    { $group: { _id: null, total: { $sum: "$amount" } } },
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

  // 7. Payments KPI – sum of payments for the current month
  const paymentsAgg = await PaymentEntry.aggregate([
    {
      $match: {
        createdAt: { $gte: startOfMonth, $lte: endOfMonth },
      },
    },
    {
      $group: { _id: null, totalPayments: { $sum: "$amount" } },
    },
  ]);
  const paymentsThisMonth = `R ${
    paymentsAgg[0]?.totalPayments?.toLocaleString() || "0"
  }`;

  return {
    totalPatients,
    activeClients,
    newPatientIntake,
    totalAppointments,
    revenue, // ✅ Now using PaymentEntry as the revenue source
    mothersDueThisMonth,
    paymentsThisMonth,
  };
}

export async function getMonthlyIntakeData() {
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 1);
  const endOfYear = new Date(now.getFullYear(), 11, 31, 23, 59, 59, 999);

  // Aggregate patient count by month
  const monthlyData = await MotherInfo.aggregate([
    {
      $match: {
        createdAt: { $gte: startOfYear, $lte: endOfYear },
      },
    },
    {
      $group: {
        _id: { $month: "$createdAt" },
        intake: { $sum: 1 },
      },
    },
    {
      $sort: { _id: 1 },
    },
  ]);

  // Format into { month: "Jan", intake: number }
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return monthNames.map((name, idx) => {
    const monthData = monthlyData.find((d) => d._id === idx + 1);
    return {
      month: name,
      intake: monthData ? monthData.intake : 0,
    };
  });
}

export async function getAppointmentStatusData() {
  // Aggregate appointments by status
  const now = new Date();

  const statusData = await Appointment.aggregate([
    { $match: { date: { $lte: now } } },
    {
      $group: {
        _id: "$status",
        value: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  // Map aggregation to chart format
  return statusData.map((item) => ({
    status: item._id,
    value: item.value,
  }));
}

export async function getMonthDuePatients() {
  const now = new Date();
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

  const patients = await MotherInfo.find({
    edd: { $gte: startOfMonth, $lte: endOfMonth },
  }).select("fullName edd");

  // Format data for the table
  return patients.map((p, idx) => ({
    id: idx + 1,
    name: p.fullName,
    dueDate: p.edd ? new Date(p.edd).toLocaleDateString() : "-",
  }));
}

export async function getPatientsForMonth(year: number, month: number) {
  await dbConnect();

  const startOfMonth = new Date(year, month, 1);
  const endOfMonth = new Date(year, month + 1, 0, 23, 59, 59, 999);

  const patients = await MotherInfo.find({
    edd: { $gte: startOfMonth, $lte: endOfMonth },
  }).select("fullName edd");

  return patients.map((p, idx) => ({
    id: idx + 1,
    name: p.fullName,
    dueDate: p.edd,
  }));
}

export async function getMonthlyRevenueData() {
  await dbConnect();

  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 1);
  const endOfYear = new Date(now.getFullYear(), 11, 31, 23, 59, 59, 999);

  // Aggregate revenue by month for the current year
  const monthlyRevenue = await PaymentEntry.aggregate([
    {
      $match: {
        createdAt: { $gte: startOfYear, $lte: endOfYear },
      },
    },
    {
      $group: {
        _id: { $month: "$createdAt" },
        totalRevenue: { $sum: "$amount" },
      },
    },
    {
      $sort: { _id: 1 },
    },
  ]);

  // Format data for the chart
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return monthNames.map((name, idx) => {
    const revenueData = monthlyRevenue.find((d) => d._id === idx + 1);
    return {
      month: name,
      revenue: revenueData ? revenueData.totalRevenue : 0,
    };
  });
}
