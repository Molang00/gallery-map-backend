import { PaginationMeta } from './pagination.meta.interface';
import { PaginationResult } from './pagination.result.interface';

export class Pagination<PaginationEntity> {
  public items: PaginationEntity[];
  public meta: PaginationMeta;

  constructor(paginationResult: PaginationResult<PaginationEntity>) {
    this.items = paginationResult.items;
    this.meta = paginationResult.meta;
  }
}
