import { Module } from '@nestjs/common';
import { EventMessageService } from './event-message.service';
import { EventMessageController } from './event-message.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventMessage } from './entities/event-message.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EventMessage])],
  controllers: [EventMessageController],
  providers: [EventMessageService],
})
export class EventMessageModule {}
