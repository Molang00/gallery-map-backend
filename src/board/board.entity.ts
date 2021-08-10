import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Board {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  writer: string;

  @Column()
  title: string;

  @Column()
  centent: string;

  @Column({ type: 'datetime' })
  created: Date;

  @Column({ type: 'datetime' })
  updated: Date;

  @Column()
  readCnt: number;
}
