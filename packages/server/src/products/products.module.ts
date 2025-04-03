import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { RabbitMQClientModule } from '../rabbitmq_client/rabbitmq_client.module';
import { ProductsService } from './products.service';

@Module({
  imports: [PrismaModule, RabbitMQClientModule.register({ name: 'PRODUCTS' })],
  providers: [ProductsService],
  controllers: [ProductsController],
})
export class ProductsModule {}
