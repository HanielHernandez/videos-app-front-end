import { useParams } from 'react-router-dom'
import { skipToken } from '@reduxjs/toolkit/query/react'
import { VideoPlayer } from '../../components/VideoPlayer'
import { useGetVideoQuery } from '../../features/videos.slice'
import { Card, CardMedia, CardHeader, Skeleton } from '@mui/material'

export const VideosDetails = () => {
	const { id } = useParams()
	const {
		data: video,
		isLoading,
		refetch
	} = useGetVideoQuery(id == undefined ? skipToken : id)

	return (
		<div>
			{isLoading && (
				<Card variant="outlined">
					<CardMedia>
						<Skeleton
							variant="rectangular"
							width="100%"
							height="33.75vw"
							sx={{
								minHeight: '128px',
								maxHeight: '648px'
							}}
						/>
					</CardMedia>
					<CardHeader
						title={
							<Skeleton
								variant="rectangular"
								sx={{ mb: 1 }}
								width="100%"
								height="32px"
							/>
						}
						subtitle={
							<Skeleton
								variant="rectangular"
								sx={{ mb: 0 }}
								width="100%"
								height="28px"
							/>
						}
					/>
				</Card>
			)}
			{video && <VideoPlayer onVideoLiked={() => refetch()} video={video} />}
		</div>
	)
}
