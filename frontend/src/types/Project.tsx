export interface Project {
  id: number;
  title: string;
  description?: string;
  leader: number;
  members: number[];
  tasks: number[];
  posted: string;
  completed: string | null;
  author: number
  urgency: "Low" | "Medium" | "High";
  deadline: string;
}