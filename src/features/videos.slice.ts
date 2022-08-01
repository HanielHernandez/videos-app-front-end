import { createSlice } from '@reduxjs/toolkit'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { PaginationParams, PaginationResponse, Video } from '../models'
import { VIDEOS_ENDPOINT_URL } from '../services/constants'

const initialState = {
	page: 1,
	perPage: 10,
	items: []
}

const converParamsQueryString = (params: PaginationParams) => {
	let queryString = '?'

	if (params.page) {
		queryString += `&page=${params.page}`
	}
	if (params.perPage) {
		queryString += `&perPage=${params.perPage}`
	}
	if (params.orderBy) {
		if (params.orderBy.field)
			queryString += `&orderByField=${params.orderBy.field}`
		if (params.orderBy.field)
			queryString += `&orderByFlow=${params.orderBy.flow}`
	}

	return queryString
}

export const videosApiSlice = createApi({
	reducerPath: 'videos',
	baseQuery: fetchBaseQuery({
		baseUrl: import.meta.env.VITE_API_URL,

		prepareHeaders(headers) {
			const token = localStorage.getItem('token')
			if (token)
				headers.set('Authorization', `Bearer ${token.replaceAll('"', '')}`)
			return headers
		}
	}),
	endpoints: (builder) => ({
		getVideos: builder.query<PaginationResponse<Video>, PaginationParams>({
			query: (paramsPagiantion) => {
				return `${VIDEOS_ENDPOINT_URL}/${converParamsQueryString(
					paramsPagiantion
				)}`
			}
		})
	})
})
export const { useGetVideosQuery } = videosApiSlice
