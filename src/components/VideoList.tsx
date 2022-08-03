import {
	Alert,
	Grid,
	Skeleton,
	Snackbar,
	Typography,
	Pagination,
	Stack
} from '@mui/material'
import { FC, useState } from 'react'
import { useGetVideosQuery } from '../features/videos.slice'
import { useSnackBar } from '../hooks/use-snack-bar'
import { useAuth } from '../hooks/use.auth'
import { Video } from '../models'
import { VideosPaginationParams } from '../models/videos-pagination-params'
import { VideoListItem } from './VideoListItem'
import { VideoListItemPlaceholder } from './VideoListItemPlaceHolder'

interface Props {
	userId?: number
	forUser?: number
}
export const VideoList: FC<Props> = ({ userId, forUser }) => {
	const { user } = useAuth()
	const { snackbarState, setSnackBarState } = useSnackBar()

	const [currentPagination, setCurrentPagination] =
		useState<VideosPaginationParams>({
			page: 1,
			perPage: 20,
			...(forUser && { forUser }),
			...(userId && { userId })
		})

	const { data, isFetching } = useGetVideosQuery(currentPagination)
	const [updatingVideo, setUpdatingVideo] = useState(false)

	const onVideoUpdated = (success?: boolean) => {
		setUpdatingVideo(success == undefined ? true : false)

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
		<Grid container sx={{ mt: 0, py: 3, justifyItems: 'flex-start' }}>
			{(isFetching || updatingVideo) &&
				Array.from(Array(12).keys()).map((i, index) => (
					<Grid key={`skeleton-${index}`} item xs={12} md={4} lg={3}>
						<VideoListItemPlaceholder />
					</Grid>
				))}
			{!isFetching && !updatingVideo && data && (
				<Grid container xs={12} spacing={3}>
					{data.items.length == 0 && (
						<Grid item xs={12}>
							<Typography variant="h5" align="center">
								No videos found
							</Typography>
						</Grid>
					)}
					{data.items.map((video: Video) => (
						<Grid key={video.id} item xs={12} md={4} lg={3}>
							<VideoListItem
								onVideoUpdated={onVideoUpdated}
								editable={user && user.id == userId ? true : false}
								video={video}
							/>
						</Grid>
					))}
					<Grid container xs={12} sx={{ justifyContent: 'center' }}>
						<Pagination
							sx={{ justifyContent: 'center', pt: 3 }}
							onChange={(event: React.ChangeEvent<unknown>, page: number) => {
								setCurrentPagination({
									...currentPagination,
									page
								})
							}}
							shape="rounded"
							count={data.totalPages}
							page={data.page || 1}
							showFirstButton
							showLastButton
						/>
					</Grid>
				</Grid>
			)}

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
