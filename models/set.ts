export abstract class Set {
  id: string;
  reps: number;
  weight?: number;
  day: Day;
  createdAt: Date;
  updatedAt: Date;
  exerciseId: any;
  workoutId: any;
  Workout?: any;
  Exercise?: any;
}

export type Day =
  | 'MONDAY'
  | 'TUESDAY'
  | 'WEDNESDAY'
  | 'THURSDAY'
  | 'FRIDAY'
  | 'SATURDAY'
  | 'SUNDAY';
