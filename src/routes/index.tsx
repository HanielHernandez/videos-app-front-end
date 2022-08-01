import { Auth } from '../views/auth/Index'
import Home from '../views/Home'
import { authRoutes } from './auth'
import { RequiresAuth, RequiresNoAuth } from './guards/RequiresAuth'

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
		path: '/',
		element: (
			<RequiresAuth>
				<Home />
			</RequiresAuth>
		)
	}
]
export default routes
