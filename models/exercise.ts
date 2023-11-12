import { Set } from "./set";

export abstract class Exercise {
  abstract id: string;
  abstract name: string; //Supino
  abstract description?: string; // Exercicio de peitop apapapapaoskdioasjdoiasjodiajsnmuiodnjasiodkasiodj
  abstract createdAt: Date;
  abstract updatedAt: Date;
  abstract Sets?: Set[];
}
