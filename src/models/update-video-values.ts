import { CreateVideoValues } from './create-video-values'

export interface UpdateVideoValues extends CreateVideoValues {
	id: string | number
}
