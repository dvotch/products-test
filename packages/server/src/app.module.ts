import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { ProductsModule } from './products/products.module';
import { ConfigModule } from '@nestjs/config';
import { SseModule } from './sse/sse.module';

@Module({
  imports: [
    PrismaModule,
    ConfigModule.forRoot({ isGlobal: true }),
    ProductsModule,
    SseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
