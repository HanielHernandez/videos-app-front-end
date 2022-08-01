import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setUser as setCurrentUser } from '../features/auth.slice'
import { User } from '../models/user'
import auth from '../services/auth'
import { AuthSignInRequest } from '../services/auth.request'
import { RootState } from '../store'

export const useAuth = () => {
	const user = useSelector((state: RootState) => state.auth.user)
	const [processing, setProcessing] = useState(Boolean)
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const setUser = (user: User | null) => {
		dispatch(setCurrentUser(user))
	}

	const signIn = async (data: AuthSignInRequest) => {
		try {
			setProcessing(true)
			const {
				data: { user, accessToken }
			} = await auth.signIn(data)
			localStorage.setItem('user', JSON.stringify(user))
			localStorage.setItem('token', JSON.stringify(accessToken))
			setUser(user)
			navigate('/home')
			setProcessing(false)
		} catch (error) {
			console.error(error)
			setProcessing(false)
			throw error
		}
	}

	const signOut = () => {
		localStorage.removeItem('user')
		localStorage.removeItem('token')
		setUser(null)
		navigate('/auth/signin')
	}
	return { user, processing, signOut, setUser, signIn }
}
