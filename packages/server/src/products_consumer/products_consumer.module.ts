import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { RabbitMQClientModule } from 'src/rabbitmq_client/rabbitmq_client.module';
import { ProductsConsumerController } from './products_consumer.controller';
import { ProductsConsumerService } from './products_consumer.service';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    PrismaModule,
    RabbitMQClientModule.register({ name: 'PRODUCTS' }),
    EventEmitterModule.forRoot(),
  ],
  controllers: [ProductsConsumerController],
  providers: [ProductsConsumerService],
})
export class ProductsConsumerModule {}
