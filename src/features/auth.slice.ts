import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { User } from '../models/user'
import { RootState } from '../store'
interface AuthState {
	user: User | null
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
