import { Card, CardHeader, CardMedia, Skeleton } from '@mui/material'

export const VideoListItemPlaceholder = () => {
	return (
		<Card variant="outlined">
			<CardMedia>
				<Skeleton variant="rectangular" width="100%" height="150px" />
			</CardMedia>
			<CardHeader
				title={<Skeleton variant="rectangular" width="100%" height="24px" />}
				subtitle={
					<Skeleton variant="rectangular" width="100%" height="150px" />
				}
				avatar={<Skeleton variant="circular" width="40px" height="40px" />}
			/>
		</Card>
	)
}
