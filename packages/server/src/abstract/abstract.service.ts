export class AService<E, C, U> {
  constructor(
    private readonly model: {
      findMany: (args?: unknown) => Promise<E[]>;
      findUnique: (args: unknown) => Promise<E | null>;
      create: (args: unknown) => Promise<E>;
      update: (args: unknown) => Promise<E>;
      delete: (args: unknown) => Promise<E>;
    },
    private readonly include?: unknown,
  ) {}

  async findAll(include?: unknown): Promise<E[]> {
    return this.model.findMany({ include: this.include || include });
  }

  findOne(id: number, include?: unknown): Promise<E> {
    return this.model.findUnique({
      where: { id },
      include: this.include || include,
    });
  }

  create(dto: C, include?: unknown): Promise<E> {
    return this.model.create({ data: dto, include: this.include || include });
  }

  update(id: number, dto: U, include?: unknown): Promise<E> {
    return this.model.update({
      where: { id },
      include: this.include || include,
      data: dto,
    });
  }

  delete(id: number, include?: unknown): Promise<E> {
    return this.model.delete({
      where: { id },
      include: this.include || include,
    });
  }
}
