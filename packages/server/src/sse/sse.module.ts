import { Module } from '@nestjs/common';
import { SseController } from './sse.controller';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [EventEmitterModule.forRoot()],
  controllers: [SseController],
})
export class SseModule {}
