// app/components/OrientationLock.tsx
"use client";

import { useEffect } from "react";

export default function OrientationLock() {
  useEffect(() => {
    if (typeof window !== "undefined" && "screen" in window) {
      const orientation: any = (window as any).screen?.orientation;
      if (orientation && typeof orientation.unlock === "function") {
        orientation.unlock().catch(() => {});
      }
    }
  }, []);

  return null; // no UI, just runs effect
}
