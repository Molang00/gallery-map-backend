import { Test, TestingModule } from '@nestjs/testing';
import { EventMessageController } from './event-message.controller';
import { EventMessageService } from './event-message.service';

describe('EventMessageController', () => {
  let controller: EventMessageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventMessageController],
      providers: [EventMessageService],
    }).compile();

    controller = module.get<EventMessageController>(EventMessageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
