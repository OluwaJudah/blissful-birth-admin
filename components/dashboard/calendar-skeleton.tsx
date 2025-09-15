export function CalendarSkeleton() {
  return (
    <div className="animate-pulse border rounded-md w-full md:w-1/2 p-4 space-y-3">
      <div className="h-6 w-32 bg-gray-300 rounded" />
      <div className="grid grid-cols-7 gap-2">
        {Array.from({ length: 35 }).map((_, i) => (
          <div key={i} className="h-8 w-full bg-gray-200 rounded"></div>
        ))}
      </div>
    </div>
  );
}

export function PatientsListSkeleton() {
  return (
    <div className="animate-pulse flex-1 p-4 border rounded-md space-y-3">
      <div className="h-5 w-48 bg-gray-300 rounded" />
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="h-4 w-40 bg-gray-200 rounded" />
      ))}
    </div>
  );
}
