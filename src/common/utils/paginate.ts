import { ObjectLiteral, SelectQueryBuilder } from 'typeorm';
import { PaginationQueryDto } from '../dtos/pagination-query.dto';
import { PaginatedResult } from '../interfaces/paginated-result.interface';

export async function paginate<T extends ObjectLiteral>(
  queryBuilder: SelectQueryBuilder<T>,
  paginationQuery: PaginationQueryDto
): Promise<PaginatedResult<T>> {
  const page = paginationQuery.page || 1;
  const limit = paginationQuery.limit || 10;

  const [items, total] = await queryBuilder
    .skip((page - 1) * limit)
    .take(limit)
    .getManyAndCount();

  return {
    items,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
}
