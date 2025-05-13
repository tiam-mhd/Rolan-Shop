import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('product_materials')
export class ProductMaterial {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;
}
