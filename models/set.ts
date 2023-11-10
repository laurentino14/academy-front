export abstract class Set {
  abstract id: string;
  abstract reps: number;
  abstract weight?: number;
  abstract day: Day;
  abstract createdAt: Date;
  abstract updatedAt: Date;
  abstract exerciseId: any;
  abstract workoutId: any;
  abstract Workout?: any;
  abstract Exercise?: any;
}

export type Day =
  | "MONDAY"
  | "TUESDAY"
  | "WEDNESDAY"
  | "THURSDAY"
  | "FRIDAY"
  | "SATURDAY"
  | "SUNDAY";
