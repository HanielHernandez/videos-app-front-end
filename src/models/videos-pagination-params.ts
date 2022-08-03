import { PaginationParams } from './pagination.params'

export interface VideosPaginationParams extends PaginationParams {
	userId?: number
	forUser?: number
}
