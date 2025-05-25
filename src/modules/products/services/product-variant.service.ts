import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductVariant } from '../entities/product-variant.entity';
import { Repository } from 'typeorm';
import { CreateProductVariantDto } from '../dtos/create-product-variant.dto';
// import { UpdateProductVariantDto } from '../dtos/update-product-variant.dto';
import { ProductService } from './product.service';
import { ColorService } from '../../color/services/color.service';
import { MaterialService } from '../../material/services/material.service';
import { Product } from '../entities/product.entity';
import { Color } from 'src/modules/color/entities/color.entity';
import { Material } from 'src/modules/material/entities/material.entity';
import { FilterProductVariantsDto } from '../dtos/filter-product-variants.dto';
import { paginate } from 'src/common/utils/paginate';

@Injectable()
export class ProductVariantService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
    @InjectRepository(ProductVariant)
    private readonly productVariantRepo: Repository<ProductVariant>,
    // private readonly productService: ProductService,
    private readonly colorService: ColorService,
    private readonly materialService: MaterialService,
  ) { }

  async create(dto: CreateProductVariantDto) {
    const product = await this.productRepo.findOne({
      where: { id: dto.productId },
    });
    if (!product) throw new NotFoundException('Product not found');

    const color = dto.colorId ? await this.colorService.findById(dto.colorId) : undefined;
    const material = dto.materialId ? await this.materialService.findById(dto.materialId) : undefined;

    const variant = this.productVariantRepo.create({
      product,
      color,
      material,
      size: dto.size,
      stock: dto.stock,
      price: dto.price ?? product.price,
    } as ProductVariant);

    return this.productVariantRepo.save(variant);
  }

  async findAll() {
    return this.productVariantRepo.find({ relations: ['product', 'color', 'material'] });
  }

  async findById(id: string) {
    const variant = await this.productVariantRepo.findOne({
      where: { id },
      relations: ['product', 'color', 'material'],
    });

    if (!variant) throw new NotFoundException('Variant not found');
    return variant;
  }

  async getVariantsByProductId(productId: string) {
    return this.productVariantRepo.find({
      where: { product: { id: productId } },
      relations: ['color', 'material'],
    });
  }


  async update(id: string, dto: CreateProductVariantDto) {
    const variant = await this.findById(id);

    if (dto.colorId) {
      variant.color = await this.colorService.findById(dto.colorId) ?? {} as Color;
    }

    if (dto.materialId) {
      variant.material = await this.materialService.findById(dto.materialId) ?? {} as Material;
    }

    variant.size = dto.size ?? variant.size;
    variant.stock = dto.stock ?? variant.stock;
    variant.price = dto.price ?? variant.price;

    return this.productVariantRepo.save(variant);
  }

  async remove(id: string) {
    const variant = await this.findById(id);
    return this.productVariantRepo.remove(variant);
  }

  async filter(dto: FilterProductVariantsDto) {
    const query = this.productVariantRepo.createQueryBuilder('variant')
      .leftJoinAndSelect('variant.product', 'product')
      .leftJoinAndSelect('variant.color', 'color')
      .leftJoinAndSelect('variant.material', 'material');

    if (dto.search) {
      query.andWhere('LOWER(product.title) LIKE LOWER(:search)', {
        search: `%${dto.search}%`,
      });
    }

    if (dto.colorId) {
      query.andWhere('color.id = :colorId', { colorId: dto.colorId });
    }

    if (dto.materialId) {
      query.andWhere('material.id = :materialId', { materialId: dto.materialId });
    }

    if (dto.minPrice) {
      query.andWhere('(variant.price IS NOT NULL AND variant.price >= :minPrice)', { minPrice: dto.minPrice });
    }

    if (dto.maxPrice) {
      query.andWhere('(variant.price IS NOT NULL AND variant.price <= :maxPrice)', { maxPrice: dto.maxPrice });
    }

    if (dto.onlyAvailable) {
      query.andWhere('variant.stock > 0');
    }

    if (dto.categoryId) {
      query.andWhere('product.categoryId = :categoryId', { categoryId: dto.categoryId });
    }

    if (dto.size) {
      Object.entries(dto.size).forEach(([key, value]) => {
        query.andWhere(`JSON_EXTRACT(variant.size, "$.${key}") = :${key}`, {
          [key]: value,
        });
      });
    }

    return paginate(query, dto);
  }

}
