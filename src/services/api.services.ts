import { PaginationParams, PaginationResponse } from '../models'
import { http } from './http'

export const createApiService = <T>(endpointURl: string) => {
	const index = (params: PaginationParams): Promise<PaginationResponse<T>> => {
		return http
			.get<PaginationResponse<T>>(`${endpointURl}/index`, { params })
			.then((response) => response.data)
	}
	const create = (body: T): Promise<any> => {
		return http.post<T>(`${endpointURl}`, body)
	}
	const update = (id: string | number, body: T): Promise<any> => {
		return http.put<T>(`${endpointURl}/${id}`, body)
	}
	const remove = (id: string | number, body: T): Promise<any> => {
		return http.delete<T>(`${endpointURl}/${id}`, body)
	}

	const find = (id: string | number): Promise<any> => {
		return http.get<T>(`${endpointURl}/${id}`)
	}

	return {
		create,
		find,
		index,
		update,
		remove
	}
}
