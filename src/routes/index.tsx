import { Auth } from '../views/auth/Index'
import { authRoutes } from './auth'

export const routes = [
	{
		path: 'auth',
		children: authRoutes,
		element: <Auth />
	}
]
export default routes
