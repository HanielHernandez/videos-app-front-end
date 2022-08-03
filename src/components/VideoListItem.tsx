import {
	Avatar,
	Card,
	CardHeader,
	CardMedia,
	IconButton,
	ListItemIcon,
	Menu,
	MenuItem,
	Tooltip,
	Typography
} from '@mui/material'
import { FC } from 'react'
import { Link } from 'react-router-dom'
import { Video } from '../models'
import { getDaysFromNow } from '../utils'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import CreateIcon from '@mui/icons-material/Create'
import PublishIcon from '@mui/icons-material/Publish'
import React from 'react'
import { usePublishVideoMutation } from '../features/videos.slice'
interface Props {
	video: Video
	editable?: boolean
	onVideoUpdated?: (success?: boolean) => void
}

export const VideoListItem: FC<Props> = ({
	video,
	editable,
	onVideoUpdated = () => {
		console.log('updated')
	}
}: Props) => {
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
	const [publishVideo] = usePublishVideoMutation()
	const open = Boolean(anchorEl)
	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault()
		setAnchorEl(event.currentTarget)
	}
	const handleClose = (event: any) => {
		event.preventDefault()
		setAnchorEl(null)
	}

	const handlePublishVideo = async (id: number) => {
		onVideoUpdated()
		try {
			await publishVideo(id).unwrap()
			console.log('Video published')
			setAnchorEl(null)
			onVideoUpdated(true)
		} catch (e) {
			setAnchorEl(null)
			onVideoUpdated(false)
			console.error(e)
		}
	}
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
					action={
						editable == true ? (
							<>
								<IconButton
									id="video-options-button"
									aria-controls={open ? 'basic-menu' : undefined}
									aria-haspopup="true"
									aria-expanded={open ? 'true' : undefined}
									onClick={handleClick}
									color="primary"
									size="small"
								>
									<MoreVertIcon />
								</IconButton>
								<Menu
									id="basic-menu"
									anchorEl={anchorEl}
									open={open}
									onClose={handleClose}
									MenuListProps={{
										'aria-labelledby': 'basic-button'
									}}
								>
									<Link to={`/videos/${video.id}/edit`}>
										<MenuItem>
											<ListItemIcon>
												<CreateIcon color="primary" fontSize="small" />
											</ListItemIcon>
											<Typography color="primary" variant="inherit">
												Edit video
											</Typography>
										</MenuItem>
									</Link>
									{video.published == false && (
										<MenuItem
											onClick={(event) => {
												event.preventDefault()
												handlePublishVideo(video.id)
											}}
										>
											<ListItemIcon>
												<PublishIcon />
											</ListItemIcon>
											<Typography variant="inherit">Publish Video</Typography>
										</MenuItem>
									)}

									<MenuItem onClick={handleClose}>Remove Video</MenuItem>
								</Menu>
							</>
						) : (
							<></>
						)
					}
				/>
			</Card>
		</Link>
	)
}
