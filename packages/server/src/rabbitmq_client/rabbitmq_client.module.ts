import { Module, DynamicModule } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RabbitMQClientConfig } from './rabbitmq_client.config';
import { RabbitMQQueuesType } from 'types/rabbitmq-queues.type';

interface RabbitMQClientModuleOptions {
    name: RabbitMQQueuesType;
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
