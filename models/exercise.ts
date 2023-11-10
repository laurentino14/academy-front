import { Set } from "./set";

export abstract class Exercise {
  abstract id: string;
  abstract name: string;
  abstract description?: string;
  abstract createdAt: Date;
  abstract updatedAt: Date;
  abstract Sets?: Set[];
}
