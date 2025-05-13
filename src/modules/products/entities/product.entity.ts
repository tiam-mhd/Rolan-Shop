import {
  Entity, PrimaryGeneratedColumn, Column,
  CreateDateColumn, UpdateDateColumn, OneToMany,
  ManyToOne,
  JoinColumn
} from 'typeorm';
import { ProductVariant } from './product-variant.entity';
import { Category } from 'src/modules/category/entities/category.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

@ManyToOne(() => Category, (category) => category.products, { eager: true })
@JoinColumn()
category: Category;

  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ unique: true })
  productCode: string;

  @Column('int')
  price: number;

  @Column('int', { nullable: true })
  discountPrice: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => ProductVariant, variant => variant.product, { cascade: true })
  variants: ProductVariant[];
}
