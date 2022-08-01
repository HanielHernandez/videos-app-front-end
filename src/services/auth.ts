import { AuthSignInRequest, AuthSignUpRequest } from './auth.request'
import { AUTH_SIGNIN_URL, AUTH_SIGNUP_URL } from './constants'
import { http } from './http'

export class Auth {
	signIn(data: AuthSignInRequest): Promise<any> {
		return http.post(AUTH_SIGNIN_URL, data)
	}

	signUp(data: AuthSignUpRequest) {
		return http.post(AUTH_SIGNUP_URL, data)
	}

	signOut() {
		localStorage.removeItem('user')
		localStorage.removeItem('token')
	}
}

export default new Auth()
