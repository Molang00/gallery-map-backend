import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Board {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  writer: string;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column({ type: 'datetime' })
  created: Date;

  @Column({ type: 'datetime' })
  updated: Date;

  @Column({ default: 0 })
  readCnt: number;

  constructor(
    writer: string,
    title: string,
    content: string,
    created: Date,
    updated: Date,
    readCnt: number,
  ) {
    this.writer = writer;
    this.title = title;
    this.content = content;
    this.created = created;
    this.updated = updated;
    this.readCnt = readCnt;
  }
}
