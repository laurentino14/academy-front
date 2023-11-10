import { Set } from './set';

export class Exercise {
  id: string;
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
  Sets?: Set[];
}
