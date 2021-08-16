import { PaginationMeta } from "./pagination.meta.interface";

export interface PaginationResult<PaginationEntity> {
    items: PaginationEntity[]
    meta: PaginationMeta
}