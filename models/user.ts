import { History } from "./history";
import { Set } from "./set";
import { Workout } from "./workout";

export type User = {
  sets: Set[];
  id: string;
  role: Role;
  hash: number;
  doc: string;
  gender: string;
  name: string;
  email: string;
  history: History[];
  birthdate: string;
  password: string;
  createdAt: Date | string;
  updatedAt: Date | string;
  workouts: Workout[];
  instructorWorkouts: Workout[];
};

export type Role = "ADMIN" | "INSTRUCTOR" | "USER";
