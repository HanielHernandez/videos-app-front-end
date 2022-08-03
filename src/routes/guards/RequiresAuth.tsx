import { Navigate } from 'react-router-dom'
import { useAuth } from '../../hooks/use.auth'

export const RequiresAuth = ({ children }: { children: JSX.Element }) => {
	console.log('Requires auth')
	const { user } = useAuth()
	console.log(user)
	if (!user) {
		// Redirect them to the /login page, but save the current location they were
		// trying to go to when they were redirected. This allows us to send them
		// along to that page after they login, which is a nicer user experience
		// than dropping them off on the home page.
		return <Navigate to="/auth/signin" replace />
	}

	return children
}

export const RequiresNoAuth = ({ children }: { children: JSX.Element }) => {
	const auth = useAuth()

	if (auth.user) {
		// Redirect them to the /login page, but save the current location they were
		// trying to go to when they were redirected. This allows us to send them
		// along to that page after they login, which is a nicer user experience
		// than dropping them off on the home page.
		return <Navigate to="/" replace />
	}

	return children
}
