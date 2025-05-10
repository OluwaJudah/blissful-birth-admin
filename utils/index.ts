import { appointmentWeeks } from "@/constants/appointment";

export const calculateTrimester = (pregnancyWeeks: number) => {
  if (pregnancyWeeks <= 12) return 0;
  else if (pregnancyWeeks <= 27) return 1;
  return 2;
};

export const calculatePregnancyWeeks = (
  lastMenstrualDate: Date,
  currentDate: Date
) => {
  const differenceInTime =
    new Date(currentDate).getTime() - new Date(lastMenstrualDate).getTime();
  return Math.floor(differenceInTime / (1000 * 60 * 60 * 24 * 7));
};

export const calculateDueDate = (lastMenstrualDate: Date) => {
  const lmpDate = new Date(lastMenstrualDate);

  lmpDate.setFullYear(lmpDate.getFullYear() + 1);
  lmpDate.setMonth(lmpDate.getMonth() - 3);
  lmpDate.setDate(lmpDate.getDate() + 7);

  return lmpDate.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export const getTuesdays = (year: number, month: number) => {
  let result = [];
  for (let month = new Date().getMonth(); month < 144; month++) {
    let tuesdays = [];
    for (let day = 1; day <= 31; day++) {
      let date = new Date(year, month, day);
      if (date.getMonth() !== month) break; // Stop if the month changes
      if (date.getDay() === 2) tuesdays.push(date.toDateString()); // 2 = Tuesday
    }
    if (tuesdays.length >= 2) {
      result.push(tuesdays[1]); // 2nd Tuesday
      result.push(tuesdays[tuesdays.length - 1]); // Last Tuesday
    }
  }

  return result.filter((dateStr) => {
    let date = new Date(dateStr);
    return date.getMonth() === month; // May is month index 4 (0-based index)
  });
};

export const getUpcomingAppointmentMondays = (
  eddStr: string
): { week: number; mondayDate: string }[] => {
  const edd = new Date(eddStr);
  const startDate = new Date(edd.getTime() - 280 * 24 * 60 * 60 * 1000); // 280 days before EDD
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Normalize for date-only comparison

  const results: {
    week: number;
    mondayDate: string;
  }[] = [];

  for (const week of appointmentWeeks) {
    const weekStart = new Date(
      startDate.getTime() + (week - 1) * 7 * 24 * 60 * 60 * 1000
    );

    // Adjust to Monday
    const day = weekStart.getDay(); // 0 = Sunday, 1 = Monday, etc.
    const diffToMonday = day === 0 ? 1 : (8 - day) % 7;
    const monday = new Date(weekStart);
    monday.setDate(weekStart.getDate() + diffToMonday);

    if (monday >= today) {
      const formattedDate = monday.toISOString().split("T")[0]; // YYYY-MM-DD

      results.push({
        week,
        mondayDate: formattedDate,
      });
    }
  }

  return results;
};
