import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('product_colors')
export class ProductColor {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;
}
