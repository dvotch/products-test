import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { ProductsModule } from './products/products.module';
import { ConfigModule } from '@nestjs/config';
import { SseModule } from './sse/sse.module';
import { ProductsConsumerModule } from './products_consumer/products_consumer.module';

@Module({
  imports: [
    PrismaModule,
    ConfigModule.forRoot({ isGlobal: true }),
    ProductsModule,
    ProductsConsumerModule,
    SseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
