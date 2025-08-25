"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

type AppointmentSelectionContextType = {
  selectedIds: string[];
  toggleAppointment: (id: string) => void;
  clearAppointments: () => void;
};

const STORAGE_KEY = "selectedAppointments";
const EXPIRY_HOURS = 18;

const AppointmentSelectionContext = createContext<
  AppointmentSelectionContextType | undefined
>(undefined);

export const AppointmentSelectionProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        const { ids, timestamp } = parsed;

        // Check expiry
        const now = Date.now();
        if (now - timestamp < EXPIRY_HOURS * 60 * 60 * 1000) {
          setSelectedIds(ids || []);
        } else {
          localStorage.removeItem(STORAGE_KEY);
        }
      } catch (err) {
        console.error("Error parsing selected appointments", err);
      }
    }
  }, []);

  // Save whenever selectedIds changes
  useEffect(() => {
    if (selectedIds.length > 0) {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ ids: selectedIds, timestamp: Date.now() })
      );
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [selectedIds]);

  const toggleAppointment = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const clearAppointments = () => {
    setSelectedIds([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <AppointmentSelectionContext.Provider
      value={{ selectedIds, toggleAppointment, clearAppointments }}
    >
      {children}
    </AppointmentSelectionContext.Provider>
  );
};

export const useAppointmentSelection = (): AppointmentSelectionContextType => {
  const context = useContext(AppointmentSelectionContext);
  if (!context) {
    throw new Error(
      "useAppointmentSelection must be used within AppointmentSelectionProvider"
    );
  }
  return context;
};
