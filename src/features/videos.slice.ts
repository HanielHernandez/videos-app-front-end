import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { PaginationResponse, Video } from '../models'
import { CreateVideoValues } from '../models/create-video-values'
import { UpdateVideoValues } from '../models/update-video-values'
import { VideosPaginationParams } from '../models/videos-pagination-params'
import { VIDEOS_ENDPOINT_URL } from '../services/constants'

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
	if (params.forUser) {
		queryString += `&forUser=${params.forUser}`
	}

	if (params.search) {
		queryString += `&search=${params.search}`
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
	tagTypes: ['videos'],
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
					return `${VIDEOS_ENDPOINT_URL}${converParamsQueryString(
						paramsPagiantion
					)}`
				},
				providesTags: ['videos']
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
			}),
			invalidatesTags: ['videos']
		}),
		publishVideo: builder.mutation<Video, number>({
			query: (id) => ({
				url: `/videos/${id}/publish`,
				method: 'POST'
			}),
			invalidatesTags: ['videos']
		}),
		likeVideo: builder.mutation<Video, number>({
			query: (id) => ({
				url: `/videos/${id}/like`,
				method: 'POST'
			})
		}),
		updateVideo: builder.mutation<Video, UpdateVideoValues>({
			query: (updateValues) => ({
				url: `/videos/${updateValues.id}`,
				method: 'put',
				body: updateValues
			}),
			invalidatesTags: ['videos']
		})
	})
})
export const {
	useGetVideosQuery,
	useUpdateVideoMutation,
	useCreateVideoMutation,
	usePublishVideoMutation,
	useLikeVideoMutation,
	useGetVideoQuery
} = videosApiSlice

interface VideoSearchState {
	search: null | string
}
const videoSearchInitialState: VideoSearchState = {
	search: null
}

export const videoSearchSlice = createSlice({
	name: 'videoSearch',
	initialState: videoSearchInitialState,
	reducers: {
		setSearch: (state, { payload }: PayloadAction<string>) => {
			state.search = payload
		}
	}
})
export const { setSearch } = videoSearchSlice.actions
export const videoSearch = videoSearchSlice.reducer
