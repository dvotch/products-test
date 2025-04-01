import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { AService } from 'src/abstract/abstract.service';
import { Prisma, PrismaClient } from '@prisma/client';

@Injectable()
export class ProductsService extends AService<
  Prisma.ProductGetPayload<unknown>,
  Prisma.ProductCreateInput,
  Prisma.ProductUpdateInput
> {
  constructor(private readonly prismaService: PrismaService) {
    super(prismaService.product);
  }
}
