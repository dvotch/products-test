import { ConfigService } from '@nestjs/config';
import { RmqOptions, Transport } from '@nestjs/microservices';

export class RabbitMQClientConfig {
    static create(name: string, configService: ConfigService): RmqOptions {
        return {
            transport: Transport.RMQ,
            options: {
                urls: [configService.get<string>('RABBIT_MQ_URI')],
                queue: configService.get<string>(`RABBIT_MQ_${name}_QUEUE`) || `${name.toLowerCase()}_queue`,
                queueOptions: {
                    durable: true,
                },
            },
        };
    }
}
