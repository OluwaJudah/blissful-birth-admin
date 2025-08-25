"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  ReactNode,
} from "react";

// ---- Types ----
type AppointmentDateFilter = {
  fromDate: Date | null;
  toDate: Date | null;
  setFromDate: (date: Date | null) => void;
  setToDate: (date: Date | null) => void;
  resetDates: () => void;
};

const STORAGE_KEY = "appointmentDateFilter";
const EXPIRY_HOURS = 18;

// ---- Context ----
const AppointmentDateFilterContext = createContext<
  AppointmentDateFilter | undefined
>(undefined);

// ---- Helpers ----
const getDefaultDates = () => {
  const today = new Date();
  const from = new Date(today);
  from.setDate(from.getDate() - 1); // yesterday

  const to = new Date(today);
  to.setDate(to.getDate() + 7); // 7 days ahead

  return { from, to };
};

const withExpiry = (data: any) => {
  return {
    value: data,
    expiry: Date.now() + EXPIRY_HOURS * 60 * 60 * 1000, // 18 hours in ms
  };
};

const getWithExpiry = (key: string) => {
  try {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) return null;

    const item = JSON.parse(itemStr);
    if (Date.now() > item.expiry) {
      localStorage.removeItem(key);
      return null;
    }
    return item.value;
  } catch (err) {
    console.error("Error reading localStorage with expiry", err);
    return null;
  }
};

// ---- Provider ----
export const AppointmentDateFilterProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { from, to } = getDefaultDates();

  const [fromDate, setFromDate] = useState<Date | null>(from);
  const [toDate, setToDate] = useState<Date | null>(to);
  const [hydrated, setHydrated] = useState(false);

  // Load from localStorage once client has mounted
  useEffect(() => {
    setHydrated(true);
    try {
      const stored = getWithExpiry(STORAGE_KEY);
      if (stored) {
        if (stored.fromDate) setFromDate(new Date(stored.fromDate));
        if (stored.toDate) setToDate(new Date(stored.toDate));
      }
    } catch (err) {
      console.error("Error parsing date filter from localStorage", err);
    }
  }, []);

  // Persist to localStorage
  useEffect(() => {
    if (!hydrated) return;
    const payload = {
      fromDate: fromDate ? fromDate.toISOString() : null,
      toDate: toDate ? toDate.toISOString() : null,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(withExpiry(payload)));
  }, [fromDate, toDate, hydrated]);

  // Reset
  const resetDates = useCallback(() => {
    const { from, to } = getDefaultDates();
    setFromDate(from);
    setToDate(to);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  // Prevent hydration mismatch by skipping SSR render
  if (!hydrated) return null;

  return (
    <AppointmentDateFilterContext.Provider
      value={{
        fromDate,
        toDate,
        setFromDate,
        setToDate,
        resetDates,
      }}
    >
      {children}
    </AppointmentDateFilterContext.Provider>
  );
};

// ---- Hook ----
export const useAppointmentDateFilter = (): AppointmentDateFilter => {
  const context = useContext(AppointmentDateFilterContext);
  if (!context) {
    throw new Error(
      "useAppointmentDateFilter must be used within an AppointmentDateFilterProvider"
    );
  }
  return context;
};
