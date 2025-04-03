import { ConfigService } from '@nestjs/config';
import { RmqOptions, Transport } from '@nestjs/microservices';
import { ConfigData } from 'config/config-data.config';
import { RabbitMQQueuesType } from 'types/rabbitmq-queues.type';

export class RabbitMQClientConfig {
    static create(name: RabbitMQQueuesType, configService: ConfigService<ConfigData>): RmqOptions {
        return {
            transport: Transport.RMQ,
            options: {
                urls: [configService.get<string>('RABBIT_MQ_URI')],
                queue: configService.get<string>(`RABBIT_MQ_${name}_QUEUE`),
                queueOptions: {
                    durable: true,
                },
            },
        };
    }
}
