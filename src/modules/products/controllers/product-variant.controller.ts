import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ProductVariantService } from '../services/product-variant.service';
import { CreateProductVariantDto } from '../dtos/create-product-variant.dto';
import { FilterProductVariantsDto } from '../dtos/filter-product-variants.dto';
// import { UpdateProductVariantDto } from '../dtos/update-product-variant.dto';

@Controller('product-variants')
export class ProductVariantController {
  constructor(private readonly productVariantService: ProductVariantService) {}

  @Post()
  create(@Body() dto: CreateProductVariantDto) {
    return this.productVariantService.create(dto);
  }

  @Get()
  findAll() {
    return this.productVariantService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productVariantService.findById(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: CreateProductVariantDto) {
    return this.productVariantService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productVariantService.remove(id);
  }

  @Get('filter')
filter(@Query() dto: FilterProductVariantsDto) {
  return this.productVariantService.filter(dto);
}
}
