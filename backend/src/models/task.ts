export interface Task {
  id: number;
  description: string;
  status: "pending" | "assigned" | "scheduled" | "completed";
  priority: "high" | "medium" | "low";
  robotId?: number;
  scheduledTime?: string;
}