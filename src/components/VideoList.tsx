import { Alert, Grid, Skeleton, Snackbar } from '@mui/material'
import { FC, useState } from 'react'
import { useGetVideosQuery } from '../features/videos.slice'
import { useSnackBar } from '../hooks/use-snack-bar'
import { useAuth } from '../hooks/use.auth'
import { VideoListItem } from './VideoListItem'
import { VideoListItemPlaceholder } from './VideoListItemPlaceHolder'

interface Props {
	userId?: number
	forUser?: number
}
export const VideoList: FC<Props> = ({ userId, forUser }) => {
	const { user } = useAuth()
	const { snackbarState, setSnackBarState } = useSnackBar()
	const { data, isFetching } = useGetVideosQuery({
		page: 1,
		perPage: 20,
		...(forUser && { forUser }),
		...(userId && { userId })
	})
	const [updatingVideo, setUpdatingVideo] = useState(false)

	const onVideoUpdated = (success?: boolean) => {
		setUpdatingVideo(!updatingVideo)

		if (success == true) {
			setSnackBarState({
				type: 'success',
				message: 'Video updated successfully',
				open: true
			})
		} else if (success == false) {
			setSnackBarState({
				type: 'error',
				message: 'Erro, Video could be updated',
				open: true
			})
		}
	}

	return (
		<Grid
			container
			spacing={3}
			sx={{ mt: 0, pb: 3, justifyItems: 'flex-start' }}
		>
			{(isFetching || updatingVideo) &&
				Array.from(Array(12).keys()).map((i, index) => (
					<Grid key={`skeleton-${index}`} item xs={12} md={4} lg={3}>
						<VideoListItemPlaceholder />
					</Grid>
				))}
			{data &&
				data.items.map((video) => (
					<Grid key={video.id} item xs={12} md={4} lg={3}>
						<VideoListItem
							onVideoUpdated={onVideoUpdated}
							editable={user && user.id == userId ? true : false}
							video={video}
						/>
					</Grid>
				))}
			<Snackbar
				anchorOrigin={{
					vertical: 'top',
					horizontal: 'center'
				}}
				open={snackbarState.open}
				autoHideDuration={6000}
				onClose={() => setSnackBarState({ ...snackbarState, open: false })}
			>
				<Alert
					onClose={() => setSnackBarState({ ...snackbarState, open: false })}
					severity={snackbarState.type}
					sx={{ width: '100%' }}
				>
					{snackbarState.message}
				</Alert>
			</Snackbar>
		</Grid>
	)
}
