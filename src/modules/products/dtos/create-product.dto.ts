import { IsString, IsOptional, IsInt, IsUUID } from 'class-validator';

export class CreateProductDto {
  @IsUUID()
    categoryId: string;

  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsString()
  productCode: string;

  @IsInt()
  price: number;

  @IsOptional()
  @IsInt()
  discountPrice?: number;
}
