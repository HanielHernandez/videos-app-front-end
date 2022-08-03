import { configureStore } from '@reduxjs/toolkit'
import authSlice from '../features/auth.slice'
import { usersApiSlice } from '../features'
import { videosApiSlice } from '../features/videos.slice'

const store = configureStore({
	reducer: {
		auth: authSlice,
		[videosApiSlice.reducerPath]: videosApiSlice.reducer,
		[usersApiSlice.reducerPath]: usersApiSlice.reducer
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(
			videosApiSlice.middleware,
			usersApiSlice.middleware
		)
})

export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export default store
