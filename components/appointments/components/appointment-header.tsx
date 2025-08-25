const AppointmentsHeader = ({ status, statusMap, fromDate, toDate }: any) => (
    <div className="mb-0 flex flex-wrap items-center justify-between space-y-2">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">
          {statusMap[status]} Appointments -{" "}
          {fromDate
            ? fromDate.toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })
            : "-"}
          {" to "}
          {toDate
            ? toDate.toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })
            : "-"}
        </h2>
        <p className="text-muted-foreground">Manage your client appointments here.</p>
      </div>
    </div>
  );
  
  export default AppointmentsHeader;
  