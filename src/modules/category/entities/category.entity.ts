import { Entity, PrimaryGeneratedColumn, Column, OneToMany, TreeParent, JoinColumn, TreeChildren, CreateDateColumn } from 'typeorm';
import { Product } from '../../products/entities/product.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @TreeParent()
  @JoinColumn({ name: 'parentId' })
  parent: Category;

  @TreeChildren()
  children: Category[];

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];

  @CreateDateColumn()
  createdAt: Date;
}
