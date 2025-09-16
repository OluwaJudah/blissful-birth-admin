export interface MonthlyData {
  month: string;
  intake: number;
}
export interface MonthlyRevenueData {
  month: string;
  revenue: number;
}
export interface StatusData {
  status: string;
  value: number;
}

export interface MonthDuePatient {
  id: number;
  name: string;
  dueDate: string;
}
