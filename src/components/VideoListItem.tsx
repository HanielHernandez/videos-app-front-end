import {
	Avatar,
	Card,
	CardActions,
	CardContent,
	CardHeader,
	CardMedia,
	IconButton,
	Tooltip,
	Typography
} from '@mui/material'
import { FC } from 'react'
import { Link } from 'react-router-dom'
import { Video } from '../models'
import { getDaysFromNow } from '../utils'
import CreateIcon from '@mui/icons-material/Create'
import { EditVideoButton } from './VideoPlayer.style'
interface Props {
	video: Video
	editable?: boolean
}

export const VideoListItem: FC<Props> = ({ video, editable }: Props) => {
	return (
		<Link to={`/videos/${video.id}`}>
			<Card
				variant="outlined"
				sx={{
					position: 'relative'
				}}
			>
				<CardMedia
					component="img"
					height="150"
					src={video.miniature}
					alt="video-image"
				/>
				<CardHeader
					title={
						<Typography
							variant="body1"
							sx={{
								fontWeight: 'medium',
								display: 'block',
								maxHeight: '48px',
								overflow: 'hidden',
								whiteSpace: 'normal',
								textOverflow: 'ellipsis'
							}}
						>
							{' '}
							{video.title}
						</Typography>
					}
					subheader={getDaysFromNow(video.createdAt)}
					avatar={
						<Tooltip title={video.publishedBy.name}>
							<Avatar src={video.publishedBy.photoURL} />
						</Tooltip>
					}
				/>
				{editable && (
					<Tooltip title="Edit video ">
						<Link to={`/videos/${video.id}/edit`}>
							<EditVideoButton color="primary" size="small">
								<CreateIcon />
							</EditVideoButton>
						</Link>
					</Tooltip>
				)}
			</Card>
		</Link>
	)
}
