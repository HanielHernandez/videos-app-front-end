import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { User } from '../models'
import { UpdateUsersValues } from '../models/update-user-valuesl'
import { USER_ENDPOINT_URL } from '../services/constants'

export const usersApiSlice = createApi({
	reducerPath: 'users',
	tagTypes: ['users', 'user'],
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
		getUser: builder.query<User, string | number>({
			query: (id: string | number) => {
				return `${USER_ENDPOINT_URL}/${id}`
			},
			providesTags: ['user']
		}),

		updateUser: builder.mutation<User, UpdateUsersValues>({
			query: (user) => ({
				url: `/users/${user.id}`,
				method: 'put',
				body: user
			}),
			invalidatesTags: ['user']
		}),
		followUser: builder.mutation<User, string | number>({
			query: (id) => ({
				url: `/users/${id}/follow`,
				method: 'post'
			})
		})
	})
})
export const { useGetUserQuery, useFollowUserMutation, useUpdateUserMutation } =
	usersApiSlice
