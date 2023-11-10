import { Set } from "./set";
import { User } from "./user";

export abstract class Workout {
  abstract id: string;
  abstract active: boolean;
  abstract name: string;
  abstract sets?: Set[];
  abstract user?: User;
  abstract userId: string;
  abstract instructor?: User;
  abstract instructorId: string;
  abstract createdAt: Date;
  abstract updatedAt: Date;
}
