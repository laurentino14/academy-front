import { Exercise } from "./exercise";
import { Workout } from "./workout";

export abstract class Set {
  abstract id: string;
  abstract reps: number;
  abstract type: Type;
  abstract weight?: number;
  abstract day: Day;
  abstract createdAt: Date | string;
  abstract updatedAt: Date | string;
  abstract exerciseId: string;
  abstract workoutId: string;
  abstract Workout: Workout;
  abstract Exercise: Exercise;
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
