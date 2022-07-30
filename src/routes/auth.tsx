import SignIn from '../views/auth/SignIn'
import SignUp from '../views/auth/SignUp'

export const authRoutes = [
	{
		path: 'signin',
		element: <SignIn />
	},
	{
		path: 'signup',
		element: <SignUp />
	}
]
