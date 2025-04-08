import { PrismaService } from '@app/prisma';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(private readonly prismaService: PrismaService) {}

  getAll() {
    return this.prismaService.product.findMany();
  }
}
