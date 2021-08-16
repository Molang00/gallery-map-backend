import { SelectQueryBuilder } from 'typeorm';
import { Pagination } from './pagination';
import { PaginationOption } from './pagination.option.interface';

export class PaginationFactory {
  static async paginate<PaginationEntity>(
    query: SelectQueryBuilder<PaginationEntity>,
    options: PaginationOption,
  ): Promise<Pagination<PaginationEntity>> {
    const totalSize = (await query.getRawMany()).length;

    const items = await query
      .take(options.limit)
      .skip((options.page - 1) * options.limit)
      .getRawMany();

    return new Pagination<PaginationEntity>({
      items: items,
      meta: {
        totalItems: totalSize,
        itemsPerPage: options.limit /* 페이지 당 아이템의 개수 */,
        currentPage: options.page,
      },
    });
  }
}
