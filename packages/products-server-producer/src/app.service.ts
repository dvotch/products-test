import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, EventPattern } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(
    @Inject('PRODUCTS_SERVICE') private readonly client: ClientProxy,
  ) {
    client.connect();
  }

  async createProduct() {
    this.client.emit('createProduct', {});
    return { message: 'created' };
  }

  @EventPattern('createProduct')
  async productCreated(data: any) {
    console.log(data);
  }
}
