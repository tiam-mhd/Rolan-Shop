import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ProductService } from '../services/product.service';
import { CreateProductDto } from '../dtos/create-product.dto';
import { CreateProductVariantDto } from '../dtos/create-product-variant.dto';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Body() dto: CreateProductDto) {
    return this.productService.createProduct(dto);
  }

  @Post(':id/variants')
  addVariant(@Param('id') productId: string, @Body() dto: CreateProductVariantDto) {
    return this.productService.addVariantToProduct({ ...dto, productId });
  }

  @Get()
  findAll() {
    return this.productService.getAllProducts();
  }

  @Get(':id/variants')
  getVariants(@Param('id') id: string) {
    return this.productService.getProductVariants(id);
  }
}
