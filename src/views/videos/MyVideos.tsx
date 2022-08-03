import { Upload } from '@mui/icons-material'
import { Grid, Button } from '@mui/material'
import { VideoList } from '../../components'
import { useAuth } from '../../hooks/use.auth'
import { Link } from 'react-router-dom'
import { UserProfile } from '../../components/UserProfile'
import { useGetUserQuery } from '../../features'
import { skipToken } from '@reduxjs/toolkit/dist/query'
export const MyVideos = () => {
	const { user } = useAuth()
	const { data: userData } = useGetUserQuery(user == null ? skipToken : user.id)

	return (
		<Grid container direction="column" sx={{ pb: 3 }}>
			<Grid xs={12}>
				{userData && (
					<UserProfile disableSubscribe user={userData}></UserProfile>
				)}
			</Grid>
			<Grid
				item
				sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}
				xs={12}
			>
				<Link to="/videos/new">
					<Button startIcon={<Upload />} variant="contained" disableElevation>
						Upload Video
					</Button>
				</Link>
			</Grid>
			<Grid item sx={{ display: 'flex', justifyContent: 'flex-end' }} xs={12}>
				{user && <VideoList userId={user.id}></VideoList>}
			</Grid>
		</Grid>
	)
}
