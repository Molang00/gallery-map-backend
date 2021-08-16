import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class EventMessage {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  message: string;

  @Column({ default: 0 })
  priority: number;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  constructor(
    message: string,
    priority: number,
    startDate: Date,
    endDate: Date,
  ) {
    this.message = message;
    this.priority = priority;
    this.startDate = startDate;
    this.endDate = endDate;
  }
}
