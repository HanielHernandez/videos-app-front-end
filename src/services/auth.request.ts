export interface AuthSignInRequest {
	email: string
	password: string
}

export interface AuthSignUpRequest extends AuthSignInRequest {
	name: string
}
