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
  // Get last Tuesday of current month
  const now = new Date();
  const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

  let lastTuesday = new Date(lastDayOfMonth);
  while (lastTuesday.getDay() !== 2) {
    // 2 = Tuesday
    lastTuesday.setDate(lastTuesday.getDate() - 1);
  }

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

    if (monday >= lastTuesday) {
      const formattedDate = monday.toISOString().split("T")[0]; // YYYY-MM-DD

      results.push({
        week,
        mondayDate: formattedDate,
      });
    }
  }

  return results;
};

function getLastTuesdayFromCurrentOrNextMonth() {
  const today = new Date();

  function getLastTuesday(year: number, month: number) {
    const lastDay = new Date(year, month + 1, 0); // last day of month
    while (lastDay.getDay() !== 2) {
      lastDay.setDate(lastDay.getDate() - 1);
    }
    return lastDay;
  }

  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();

  let lastTuesday = getLastTuesday(currentYear, currentMonth);

  // If it's before today, move to next month
  if (lastTuesday < today) {
    const nextMonth = currentMonth === 11 ? 0 : currentMonth + 1;
    const nextYear = currentMonth === 11 ? currentYear + 1 : currentYear;
    lastTuesday = getLastTuesday(nextYear, nextMonth);
  }

  return lastTuesday;
}

export const getAppointmentMondaysAfterLastTuesday = (
  eddStr: string
): any[] => {
  const edd = new Date(eddStr);
  const startDate = new Date(edd.getTime() - 280 * 24 * 60 * 60 * 1000); // start of Week 1

  // Get last Tuesday of current month
  let lastTuesday = getLastTuesdayFromCurrentOrNextMonth();
  const mondayDates: any[] = [];

  for (const week of appointmentWeeks) {
    const weekStart = new Date(
      startDate.getTime() + (week - 1) * 7 * 24 * 60 * 60 * 1000
    );

    // Align to Monday
    const day = weekStart.getDay(); // Sunday = 0, Monday = 1, etc.
    const diffToMonday = day === 0 ? 1 : (8 - day) % 7;
    const monday = new Date(weekStart);
    monday.setDate(weekStart.getDate() + diffToMonday);

    // Include only Mondays after the last Tuesday of the current month
    if (monday > lastTuesday) {
      const formatted = monday.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });

      mondayDates.push({
        week,
        mondayDate: formatted,
      });
    }
  }

  return mondayDates;
};

export const parseDate = (dateStr: string): Date => {
  const [day, month, year] = dateStr.split('/').map(Number);
  return new Date(year, month - 1, day); // Month is 0-based
};