import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '@app/prisma';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: 'apps/server-producer/.env',
      isGlobal: true,
    }),
    PrismaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
