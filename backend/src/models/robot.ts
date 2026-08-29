export interface Robot {
  id: number;
  name: string;
  status: "available" | "busy" | "charging";
  battery: number;
}