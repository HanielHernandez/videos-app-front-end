import { Card, CardContent, CardMedia, Typography } from '@mui/material'
import { FC } from 'react'
import { Video } from '../models'

interface Props {
	video: Video
}

export const VideoListItem: FC<Props> = ({ video }: Props) => {
	return (
		<Card variant="outlined">
			<CardMedia
				component="img"
				src={video.miniature}
				height={190}
				alt="video-image"
			/>
			<CardContent>
				<Typography variant="body1">{video.title}</Typography>
				<Typography variant="subtitle2">{video.publishedBy.name}</Typography>
			</CardContent>
		</Card>
	)
}
