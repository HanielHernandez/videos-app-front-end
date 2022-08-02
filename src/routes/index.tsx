import { Children } from 'react'
import { Auth } from '../views/auth/Index'
import Home from '../views/Home'
import { Videos } from '../views/videos/Index'
import { authRoutes } from './auth'
import { RequiresAuth, RequiresNoAuth } from './guards/RequiresAuth'
import { videosRoutes } from './videos'

export const routes = [
	{
		path: 'auth',
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
		Element: (
			<RequiresAuth>
				<Videos />
			</RequiresAuth>
		)
	},

	{
		path: '/',
		element: (
			<RequiresAuth>
				<Home />
			</RequiresAuth>
		)
	}
]
export default routes
