import { Grid } from '@mui/material'
import { useGetVideosQuery } from '../features/videos.slice'
import { VideoListItem } from './VideoListItem'

export const VideoList = () => {
	const { data, isFetching } = useGetVideosQuery({
		page: 1,
		perPage: 10
	})
	return (
		<>
			{isFetching && 'Loading ...'}

			<Grid container spacing={3} sx={{ mt: 4 }}>
				{data &&
					data.items.map((video) => (
						<Grid key={video.id} item xs={12} md={4} lg={3}>
							<VideoListItem video={video} />
						</Grid>
					))}
			</Grid>
		</>
	)
}
