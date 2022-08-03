import { number } from 'yup'
import { CreateVideoValues } from './create-video-values'
import { User } from './user'

export interface Video extends CreateVideoValues {
	id: number
	published: boolean
	publishedBy: User
	createdAt: Date
	updatedAt: Date
	likes: Like[]
	subscribed: null | object
}

export interface Like {
	id: number
	likeById: number
	videoId: number
}
