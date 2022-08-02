import { Upload } from '@mui/icons-material'
import { Grid, Button } from '@mui/material'
import { VideoList } from '../../components'
import { useAuth } from '../../hooks/use.auth'
import { Link } from 'react-router-dom'
export const MyVideos = () => {
	const { user } = useAuth()
	return (
		<Grid container sx={{ py: 3 }}>
			<Grid item sx={{ display: 'flex', justifyContent: 'flex-end' }} xs={12}>
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
