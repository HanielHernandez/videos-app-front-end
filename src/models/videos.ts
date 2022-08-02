import { CreateVideoValues } from './create-video-values'
import { User } from './user'

export interface Video extends CreateVideoValues {
	id: number
	published: boolean
	publishedBy: User
	createdAt: Date
	updatedAt: Date
}
