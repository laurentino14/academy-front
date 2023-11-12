export abstract class History {
  abstract id: string;
  abstract setId: string;
  abstract createdAt: Date | string;
  abstract updatedAt: Date | string;
  abstract userId: string;
}
