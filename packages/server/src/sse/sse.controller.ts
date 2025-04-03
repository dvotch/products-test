import { Controller, Sse, MessageEvent } from '@nestjs/common';
import { Observable } from 'rxjs';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Controller('events')
export class SseController {
    private clients: Set<(event: MessageEvent) => void> = new Set();

    constructor(private eventEmitter: EventEmitter2) {
        this.eventEmitter.on('product.event', (event) => {
            this.broadcast({ data: event });
        });
    }

    @Sse('sse')
    sse(): Observable<MessageEvent> {
        return new Observable((subscriber) => {
            const handler = (event: MessageEvent) => subscriber.next(event);
            this.clients.add(handler);

            return () => {
                this.clients.delete(handler);
            };
        });
    }

    private broadcast(event: MessageEvent) {
        this.clients.forEach((handler) => handler(event));
    }
}
