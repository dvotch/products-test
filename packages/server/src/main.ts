import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { RabbitMQClientConfig } from './rabbitmq_client/rabbitmq_client.config';
import { ValidationPipe } from '@nestjs/common';
import { ConfigData } from 'config/config-data.config';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe());

    const configService = app.get<ConfigService<ConfigData>>(ConfigService);

    app.connectMicroservice<MicroserviceOptions>(RabbitMQClientConfig.create('PRODUCTS', configService));

    await app.startAllMicroservices();

    app.enableCors({ origin: true });
    await app.listen(configService.get<number>('PORT'));
}
bootstrap();
