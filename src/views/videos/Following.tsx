import { Grid } from '@mui/material'
import { VideoList } from '../../components'
import { useAuth } from '../../hooks/use.auth'

export const FollowingVideos = () => {
	const { user } = useAuth()
	return (
		<Grid container>
			<Grid item xs={12}>
				{user && <VideoList forUser={user.id} />}
			</Grid>
		</Grid>
	)
}
