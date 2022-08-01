import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
	buildCreateApi,
	createApi,
	fetchBaseQuery
} from '@reduxjs/toolkit/query/react'

import { User } from '../models/user'
import { AuthSignInRequest } from '../services/auth.request'
import { RootState } from '../store'
import { Auth } from '../views/auth/Index'
interface AuthState {
	user: User | null
}
interface AuthSigInResponse {
	user: User
	accessToken: string
}

const initialState = (): AuthState => {
	const userString = localStorage.getItem('user')
	return {
		user: userString ? JSON.parse(userString) : null
	}
}

export const authSlice = createSlice({
	name: 'auth',
	initialState: initialState(),
	reducers: {
		setUser: (state, { payload }: PayloadAction<User | null>) => {
			state.user = payload
		}
	}
})
export const { setUser } = authSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectAuth = (state: RootState) => state.auth.user
export default authSlice.reducer
