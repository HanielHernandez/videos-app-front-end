import { createSlice } from '@reduxjs/toolkit'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { PaginationParams, PaginationResponse, Video } from '../models'
import { CreateVideoValues } from '../models/create-video-values'
import { UpdateVideoValues } from '../models/update-video-values'
import { VideosPaginationParams } from '../models/videos-pagination-params'
import { VIDEOS_ENDPOINT_URL } from '../services/constants'

const initialState = {
	page: 1,
	perPage: 10,
	items: []
}

const converParamsQueryString = (params: VideosPaginationParams) => {
	let queryString = '?'

	if (params.page) {
		queryString += `&page=${params.page}`
	}
	if (params.perPage) {
		queryString += `&perPage=${params.perPage}`
	}
	if (params.userId) {
		queryString += `&userId=${params.userId}`
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
		getVideos: builder.query<PaginationResponse<Video>, VideosPaginationParams>(
			{
				query: (paramsPagiantion) => {
					return `${VIDEOS_ENDPOINT_URL}/${converParamsQueryString(
						paramsPagiantion
					)}`
				}
			}
		),
		getVideo: builder.query<Video, string>({
			query: (id: string) => {
				return `${VIDEOS_ENDPOINT_URL}/${id}`
			}
		}),
		createVideo: builder.mutation<Video, CreateVideoValues>({
			query: (video) => ({
				url: '/videos',
				method: 'POST',
				body: video
			})
		}),
		updateVideo: builder.mutation<Video, UpdateVideoValues>({
			query: (updateValues) => ({
				url: `/videos/${updateValues.id}`,
				method: 'put',
				body: updateValues
			})
		})
	})
})
export const {
	useGetVideosQuery,
	useUpdateVideoMutation,
	useCreateVideoMutation,
	useGetVideoQuery
} = videosApiSlice
