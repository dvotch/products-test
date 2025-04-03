import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ProductsConsumerService } from './products_consumer.service';
import { Prisma } from '@prisma/client';

@Controller()
export class ProductsConsumerController {
  constructor(private readonly productsService: ProductsConsumerService) {}

  @MessagePattern({ cmd: 'get_products' })
  async getProducts() {
    return this.productsService.getAll();
  }

  @MessagePattern({ cmd: 'create_product' })
  async createProduct(@Payload() dto: Prisma.ProductCreateInput) {
    return this.productsService.create(dto);
  }

  @MessagePattern({ cmd: 'update_product' })
  async updateProduct(
    @Payload() { id, dto }: { id: number; dto: Prisma.ProductUpdateInput },
  ) {
    return this.productsService.update(id, dto);
  }

  @MessagePattern({ cmd: 'delete_product' })
  async deleteProduct(@Payload() id: number) {
    return this.productsService.delete(id);
  }
}
