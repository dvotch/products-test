import { Module, DynamicModule } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';

interface RabbitMQClientModuleOptions {
  name: string;
}

@Module({})
export class RabbitMQClientModule {
  static register({ name }: RabbitMQClientModuleOptions): DynamicModule {
    return {
      module: RabbitMQClientModule,
      imports: [
        ConfigModule,
        ClientsModule.registerAsync([
          {
            name: `${name}_SERVICE`,
            useFactory: (configService: ConfigService) => ({
              transport: Transport.RMQ,
              options: {
                urls: [configService.get<string>('RABBIT_MQ_URI')],
                queue: configService.get<string>(`RABBIT_MQ_${name}_QUEUE`),
              },
            }),
            inject: [ConfigService],
          },
        ]),
      ],
      exports: [ClientsModule],
    };
  }
}
