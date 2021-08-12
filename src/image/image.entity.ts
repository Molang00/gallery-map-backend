import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Image {
  //   @PrimaryGeneratedColumn('uuid')
  //   id: string;

  @PrimaryColumn()
  path: string;

  @Column({ type: 'double precision' })
  lat: number;

  @Column({ type: 'double precision' })
  lng: number;

  @Column({ type: 'int' })
  height: number;

  @Column({ type: 'int' })
  width: number;

  @Column({ type: 'timestamp' })
  createDate: Date;

  @Column({ type: 'timestamp' })
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
