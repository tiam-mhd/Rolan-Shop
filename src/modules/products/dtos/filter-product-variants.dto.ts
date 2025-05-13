import { IsOptional, IsString, IsNumber, IsObject, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';

export class FilterProductVariantsDto extends PaginationQueryDto  {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsString()
  categoryId?: string;

  @IsOptional()
  @IsString()
  colorId?: string;

  @IsOptional()
  @IsString()
  materialId?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  minPrice?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  maxPrice?: number;

  @IsOptional()
  @IsObject()
  size?: Record<string, string | number>;

  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  onlyAvailable?: boolean;
}
