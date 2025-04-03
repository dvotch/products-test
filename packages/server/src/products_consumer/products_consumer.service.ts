import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class ProductsConsumerService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly eventEmitter: EventEmitter2,
    ) {}

    async getAll() {
        return this.prismaService.product.findMany();
    }

    async create(dto: Prisma.ProductCreateInput) {
        const product = await this.prismaService.product.create({ data: dto });
        this.eventEmitter.emit('product.event', {
            type: 'created',
            data: product,
        });
        return product;
    }

    async update(id: number, dto: Prisma.ProductUpdateInput) {
        const product = await this.prismaService.product.update({
            where: { id },
            data: dto,
        });
        this.eventEmitter.emit('product.event', {
            type: 'updated',
            data: product,
        });
        return product;
    }

    async delete(id: number) {
        const product = await this.prismaService.product.delete({ where: { id } });
        this.eventEmitter.emit('product.event', {
            type: 'deleted',
            data: product,
        });
        return product;
    }
}
