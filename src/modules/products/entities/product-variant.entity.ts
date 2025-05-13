import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
} from 'typeorm';
import { Product } from './product.entity';
import { Color } from 'src/modules/color/entities/color.entity';
import { Material } from 'src/modules/material/entities/material.entity';

@Entity()
export class ProductVariant {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Product, product => product.variants, { eager: false, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'productId' })
    product: Product;

    @Column()
    productId: string;

    @ManyToOne(() => Color, { eager: true })
    @JoinColumn()
    color: Color;

    @ManyToOne(() => Material, { eager: true })
    @JoinColumn()
    material: Material;

    @Column('simple-json')
    size: Record<string, string>; // مثل: { height: "30", waist: "80" }

    @Column({ nullable: true })
    price: number;

    @Column()
    stock: number;

    @CreateDateColumn()
    createdAt: Date;
}
