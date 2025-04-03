import { Module, DynamicModule } from '@nestjs/common';
import { ClientsModule, RmqOptions, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RabbitMQClientConfig } from './rabbitmq_client.config';

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
                        useFactory: (configService: ConfigService) => RabbitMQClientConfig.create(name, configService),
                        inject: [ConfigService],
                    },
                ]),
            ],
            exports: [ClientsModule],
        };
    }
}
