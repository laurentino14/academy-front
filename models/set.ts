
export abstract class Set {
  abstract reps: number;
  abstract type: Type;
  abstract weight?: number;
  abstract day: Day;
  abstract machineId: string;
  abstract exerciseId: string;
  abstract series: number;
}

export type Type = "BACK" | "CHEST" | "LEGS" | "SHOULDERS" | "ARMS" | "ABS";

export type Day =
  | "MONDAY"
  | "TUESDAY"
  | "WEDNESDAY"
  | "THURSDAY"
  | "FRIDAY"
  | "SATURDAY"
  | "SUNDAY";
