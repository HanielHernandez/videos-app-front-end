import { string } from 'yup/lib/locale'

export interface CreateVideoValues {
	title: string
	description: string
	url: string
	miniature: string
	publishedById?: number
}
