import { Workout } from "./workout";

export type User = {
  id: string;
  role: Role;
  doc: string;
  gender: string;
  name: string;
  email: string;
  birthdate: string;
  password: string;
  createdAt: Date | string;
  updatedAt: Date | string;
  workouts: Workout[];
  instructorWorkouts: Workout[];
};

export type Role = "ADMIN" | "INSTRUCTOR" | "USER";
