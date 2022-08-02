import { Grid, Skeleton } from '@mui/material'
import { FC } from 'react'
import { useGetVideosQuery } from '../features/videos.slice'
import { useAuth } from '../hooks/use.auth'
import { VideoListItem } from './VideoListItem'

interface Props {
	userId?: number
}
export const VideoList: FC<Props> = ({ userId }) => {
	const { user } = useAuth()
	const { data, isFetching } = useGetVideosQuery({
		page: 1,
		perPage: 10,
		...(userId && { userId })
	})
	return (
		<Grid container spacing={3} sx={{ mt: 0 }}>
			{isFetching &&
				Array(10).map((i) => (
					<Grid key={`skeleton-${i}`} item xs={12} md={4} lg={3}>
						<Skeleton variant="rectangular" width="100%" height="150" />
					</Grid>
				))}
			{data &&
				data.items.map((video) => (
					<Grid key={video.id} item xs={12} md={4} lg={3}>
						<VideoListItem
							editable={user && user.id == userId ? true : false}
							video={video}
						/>
					</Grid>
				))}
		</Grid>
	)
}
