// app/components/OrientationLock.tsx
"use client";

import { useEffect } from "react";

export default function OrientationLock() {
  useEffect(() => {
    if (typeof window !== "undefined" && "orientation" in screen) {
      if (typeof screen.orientation.unlock === "function") {
        const result = screen.orientation.unlock();
        Promise.resolve(result).catch((err) => {
          console.warn("Orientation unlock failed:", err);
        });
      } else {
        console.info("Screen orientation unlock not supported on this device.");
      }
    }
  }, []);

  return null; // just runs effect
}
