import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEventMessageDto } from './dto/create-event-message.dto';
import { UpdateEventMessageDto } from './dto/update-event-message.dto';
import { EventMessage } from './entities/event-message.entity';

@Injectable()
export class EventMessageService {
  constructor(
    @InjectRepository(EventMessage)
    private readonly eventMessageRepository: Repository<EventMessage>,
  ) {
    this.eventMessageRepository = eventMessageRepository;
  }

  async create(createEventMessageDto: CreateEventMessageDto) {
    const eventMEssage = await this.eventMessageRepository.save(
      createEventMessageDto,
    );
    return Object.assign({
      data: eventMEssage,
      statusMsg: `saved successfully`,
    });
  }

  async findAll() {
    const now = new Date();
    const queryBuilder = this.eventMessageRepository
      .createQueryBuilder('em')
      .select('em.message as message')
      .where(':now between em.startDate and em.endDate', { now })
      .orderBy('em.priority', 'DESC');

    return await queryBuilder.getRawMany();
  }

  async findOne(id: number) {
    const foundEventMessage = await this.eventMessageRepository.findOne({
      id: id,
    });
    return Object.assign(foundEventMessage);
  }

  async update(id: number, updateEventMessageDto: UpdateEventMessageDto) {
    await this.eventMessageRepository.update(id, updateEventMessageDto);
    return Object.assign({
      data: { userId: id },
      statusMsg: `updated successfully`,
    });
  }

  async remove(id: number) {
    await this.eventMessageRepository.delete({ id: id });
    return Object.assign({
      data: { userId: id },
      statusMsg: `deleted successfully`,
    });
  }
}
