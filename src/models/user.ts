import { AuthSignUpRequest } from '../services/auth.request'

export interface User extends AuthSignUpRequest {
	id: number
	photoURL: string
	createdAt: string
	updatedAt: string
}
