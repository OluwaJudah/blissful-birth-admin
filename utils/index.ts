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

const MS_IN_DAY = 24 * 60 * 60 * 1000;

export const getFutureAppointmentMondaysFromEdd = (
  eddStr: string,
  todayStr?: string
): { week: number; mondayDate: Date; formatted: string }[] => {
  const edd = new Date(eddStr);
  const today = todayStr ? new Date(todayStr) : new Date();
  const lmp = new Date(edd.getTime() - 280 * MS_IN_DAY); // LMP: Week 1 starts

  // Calculate current pregnancy week
  const daysPregnant = Math.floor(
    (today.getTime() - lmp.getTime()) / MS_IN_DAY
  );
  const currentWeek = Math.floor(daysPregnant / 7);

  const futureWeeks = appointmentWeeks.filter((week) => week >= currentWeek);
  const mondays: { week: number; mondayDate: Date; formatted: string }[] = [];

  for (const week of futureWeeks) {
    const weekStart = new Date(
      lmp.getTime() + (week - 1) * 7 * MS_IN_DAY + 1 * MS_IN_DAY
    );
    const weekEnd = new Date(weekStart.getTime() + 6 * MS_IN_DAY);

    // Walk through each day of the week to find a Monday
    let monday: Date | null = null;
    for (
      let d = new Date(weekStart);
      d <= weekEnd;
      d.setDate(d.getDate() + 1)
    ) {
      if (d.getDay() === 1) {
        monday = new Date(d);
        break;
      }
    }

    if (!monday) continue; // No Monday found in the week — unlikely

    mondays.push({
      week,
      mondayDate: monday,
      formatted: monday.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
    });
  }

  return mondays;
};

export const parseDate = (dateStr: string): Date => {
  if (dateStr === "") return new Date();

  const [day, month, year] = dateStr.split("/").map(Number);

  if (!day || !month || !year) throw new Error("Invalid date format");

  const parsed = new Date(year, month - 1, day); // Month is 0-based
  if (isNaN(parsed.getTime())) throw new Error("Invalid date value");

  return parsed;
};

// utils/dateUtils.ts

export function formatDateLocal(date: Date): string {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function parseLocalDate(dateStr: string): Date {
  const [year, month, day] = dateStr.split("-").map(Number);
  return new Date(year, month - 1, day); // Local time
}

export function toLocalISOString(date: Date): string {
  if (isNaN(date.getTime())) {
    throw new Error(`Invalid Date passed to toLocalISOString: ${date}`);
  }
  const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  return localDate.toISOString().split("T")[0];
}
