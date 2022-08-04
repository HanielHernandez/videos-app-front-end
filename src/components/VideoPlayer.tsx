import { LoadingButton } from '@mui/lab'
import {
	Card,
	CardHeader,
	Grid,
	CardContent,
	Divider,
	Typography
} from '@mui/material'
import { FC, useMemo } from 'react'
import { useAuth } from '../hooks/use.auth'
import { Video } from '../models'
import { getDaysFromNow } from '../utils'
import { CustomVideoPlayer } from './VideoPlayer.style'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import { useGetUserQuery, useLikeVideoMutation } from '../features'
import { UserProfile } from './UserProfile'
import { skipToken } from '@reduxjs/toolkit/dist/query'
interface Props {
	video: Video
	onVideoLiked: () => void
}
export const VideoPlayer: FC<Props> = ({ video, onVideoLiked }: Props) => {
	const { user } = useAuth()
	const [likeVideo, { isLoading: isLikingVideo }] = useLikeVideoMutation()

	const isLikedByCurrentUser = useMemo(() => {
		return user
			? video.likes.findIndex((like) => like.likeById == user.id) > -1
			: false
	}, [video, user])

	const handleOnLikeVideo = async () => {
		try {
			await likeVideo(video.id).unwrap()
			onVideoLiked()
		} catch (e) {
			console.error(e)
		}
	}
	const {
		data: publisher,
		isLoading: isLoadingUser,
		refetch: refetchUser
	} = useGetUserQuery(video == undefined ? skipToken : video.publishedById)

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
						action={
							<LoadingButton
								sx={{
									marginTop: 1,
									marginRight: 1,
									marginBottom: 1
								}}
								startIcon={<ThumbUpIcon />}
								loading={isLikingVideo}
								color="primary"
								disableElevation
								onClick={() => handleOnLikeVideo()}
								variant={isLikedByCurrentUser ? 'contained' : 'outlined'}
							>
								Likes {video.likes.length > 0 ? video.likes.length : ''}
							</LoadingButton>
						}
						subheader={getDaysFromNow(video.createdAt)}
					/>
					<CardContent>
						<Divider />
						{publisher && (
							<UserProfile
								isForVideo
								user={publisher}
								onSubscribed={() => refetchUser()}
							/>
						)}

						<Typography variant="body1">{video.description}</Typography>
					</CardContent>
				</Card>
			</Grid>
		</Grid>
	)
}
