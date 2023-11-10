import { Set } from './set';
import { User } from './user';

export class Workout {
  id: string;
  active: boolean;
  name: string;
  sets?: Set[];
  User?: User;
  userId: string;
  Instructor?: User;
  instructorId: string;
  createdAt: Date;
  updatedAt: Date;
}
