import { Set } from './set';

export class Machine {
  id: string;
  name: string;
  createdAt: Date | string;
  updatedAt: Date | string;
  sets?: Set[];
}
