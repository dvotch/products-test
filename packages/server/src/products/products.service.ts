import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @Inject('PRODUCTS_SERVICE') private readonly productClient: ClientProxy,
  ) {
    // this.productClient.connect();
  }

  async create(dto: CreateProductDto) {
    return this.productClient.send({ cmd: 'create_product' }, dto);
  }

  async update(id: number, dto: UpdateProductDto) {
    return this.productClient.send({ cmd: 'update_product' }, { id, dto });
  }

  async delete(id: number) {
    return this.productClient.send({ cmd: 'delete_product' }, id);
  }

  async findAll() {
    return this.productClient.send({ cmd: 'get_products' }, {});
  }
}
