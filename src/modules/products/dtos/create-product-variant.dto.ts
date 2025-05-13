import {
  IsUUID, IsOptional, IsInt, IsObject
} from 'class-validator';

export class CreateProductVariantDto {
  @IsUUID()
  productId: string;

  @IsOptional()
  @IsUUID()
  colorId?: string;

  @IsOptional()
  @IsUUID()
  materialId?: string;

  @IsObject()
  size: Record<string, string>;

  @IsInt()
  stock: number;

  @IsOptional()
  @IsInt()
  price?: number;
}
