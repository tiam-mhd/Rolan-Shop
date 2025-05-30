import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductVariant } from './entities/product-variant.entity';
import { ProductService } from './services/product.service';
import { ProductController } from './controllers/product.controller';
import { ProductVariantService } from './services/product-variant.service';
import { ProductVariantController } from './controllers/product-variant.controller';

import { ColorModule } from '../color/color.module';
import { MaterialModule } from '../material/material.module';
import { Color } from '../color/entities/color.entity';
import { Material } from '../material/entities/material.entity';
import { ColorService } from '../color/services/color.service';
import { CategoryService } from '../category/services/category.service';
import { Category } from '../category/entities/category.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, ProductVariant, Color, Material,Category]),

    ColorModule,
    MaterialModule,
  ],
  controllers: [ProductController, ProductVariantController],
  providers: [ProductService, ProductVariantService, ProductService, ProductVariantService, ColorService, CategoryService],
})
export class ProductModule { }
