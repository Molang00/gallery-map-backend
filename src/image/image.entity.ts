import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Image {
  //   @PrimaryGeneratedColumn('uuid')
  //   id: string;

  @PrimaryColumn()
  path: string;

  @Column({ type: 'double' })
  lat: number;

  @Column({ type: 'double' })
  lng: number;

  @Column({ type: 'int' })
  height: number;

  @Column({ type: 'int' })
  width: number;

  @Column({ type: 'datetime' })
  createDate: Date;

  @Column({ type: 'datetime' })
  uploaded: Date;

  constructor(
    path: string,
    lat: number,
    lng: number,
    width: number,
    height: number,
    createDate: Date,
    uploaded: Date,
  ) {
    this.path = path;
    this.lat = lat;
    this.lng = lng;
    this.width = width;
    this.height = height;
    this.createDate = createDate;
    this.uploaded = uploaded;
  }
}
