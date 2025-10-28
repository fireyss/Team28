export interface Task {
  id: number;
  title: string;
  description?: string;
  assignee: number;
  status: "Todo" | "In Process" | "In Review" | "Done";
  project: number;
  urgency: "Low" | "Medium" | "High";
  posted: string;
  completed: string | null;
  deadline: string;
}