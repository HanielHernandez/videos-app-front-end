import { Auth } from '../views/auth/Index'
import { authRoutes } from './auth'
import { RequiresAuth, RequiresNoAuth } from './guards/RequiresAuth'
import { videosRoutes } from './videos'
import { MyProfile } from '../views/Me'
import { Id } from '../views/creators/Id'
import { Navigate } from 'react-router-dom'
import Videos from '../views/videos/Index'
export const routes = [
	{
		path: '/auth',
		children: authRoutes,
		element: (
			<RequiresNoAuth>
				<Auth />
			</RequiresNoAuth>
		)
	},
	{
		path: '/videos',
		children: videosRoutes,
		element: (
			<RequiresAuth>
				<Videos />
			</RequiresAuth>
		)
	},
	{
		path: '/me',
		element: (
			<RequiresAuth>
				<MyProfile />
			</RequiresAuth>
		)
	},
	{
		path: '/creators/:id',
		element: (
			<RequiresAuth>
				<Id />
			</RequiresAuth>
		)
	},
	{
		path: '/',
		element: <Navigate to="videos" />
	}
]
export default routes
