import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../entities/product.entity';
import { ProductVariant } from '../entities/product-variant.entity';
import { CreateProductDto } from '../dtos/create-product.dto';
import { CreateProductVariantDto } from '../dtos/create-product-variant.dto';
import { ProductVariantService } from './product-variant.service';
import { CategoryService } from 'src/modules/category/services/category.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepo: Repository<Product>,

    @InjectRepository(ProductVariant)
    private variantRepo: Repository<ProductVariant>,


    private readonly categoryService: CategoryService,
    private readonly productVariantService: ProductVariantService,
  ) { }

  async createProduct(dto: CreateProductDto): Promise<Product> {
    const category = await this.categoryService.findById(dto.categoryId);
if (!category) throw new NotFoundException('Category not found');

    const product = this.productRepo.create({...dto, category});
    return this.productRepo.save(product);
  }

  async addVariantToProduct(dto: CreateProductVariantDto): Promise<ProductVariant> {
    const product = await this.productRepo.findOne({ where: { id: dto.productId } });
    if (!product) throw new NotFoundException('Product not found');

    const variant = this.variantRepo.create({
      ...dto,
      product,
    });

    return this.variantRepo.save(variant);
  }

  async getAllProducts(): Promise<Product[]> {
    return this.productRepo.find({ relations: ['variants'] });
  }

  async getProductVariants(productId: string): Promise<ProductVariant[]> {
    return this.variantRepo.find({
      where: { product: { id: productId } },
    });
  }

  async getVariants(productId: string) {
    return this.productVariantService.getVariantsByProductId(productId);
  }

}
