import {
	Card,
	CardHeader,
	Grid,
	Button,
	CardContent,
	Divider,
	Typography,
	Avatar,
	Tooltip
} from '@mui/material'
import { FC } from 'react'
import { Video } from '../models'
import { getDaysFromNow } from '../utils'
import { CustomVideoPlayer, VideoPublisher } from './VideoPlayer.style'

interface Props {
	video: Video
}
export const VideoPlayer: FC<Props> = ({ video }) => {
	return (
		<Grid container spacing={0} direction="column">
			<CustomVideoPlayer controls>
				<source type="video/mp4" src={video.url} />
			</CustomVideoPlayer>
			<Grid item xs={12}>
				<Card variant="outlined">
					<CardHeader
						sx={{ pb: 0 }}
						title={
							<Typography
								variant="h5"
								sx={{
									fontWeight: 'medium',
									display: 'block',
									overflow: 'hidden',
									whiteSpace: 'normal',
									textOverflow: 'ellipsis'
								}}
							>
								{video.title}
							</Typography>
						}
						subheader={getDaysFromNow(video.createdAt)}
					/>
					<CardContent>
						<Divider />

						<VideoPublisher>
							<Avatar src={video.publishedBy.photoURL} sx={{ mr: 2 }} />
							<Typography sx={{ width: '100%' }} variant="h6">
								{video.publishedBy.name}
							</Typography>
							<Button variant="contained" disableElevation>
								Subscribe
							</Button>
						</VideoPublisher>
						<Typography variant="body1">{video.description}</Typography>
					</CardContent>
				</Card>
			</Grid>
		</Grid>
	)
}
