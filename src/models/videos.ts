import { User } from './user'

export interface Video {
	id: number
	url: string
	title: string
	description: string
	published: boolean
	miniature: string
	publishedById: number | null
	publishedBy: User
	createdAt: Date
	updatedAt: Date
}
