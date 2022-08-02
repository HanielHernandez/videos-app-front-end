import { Grid, Button } from '@mui/material'
import { VideoForm } from '../../components/VideoForm'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Link } from 'react-router-dom'
export const NewVideo = () => {
	return (
		<Grid container sx={{ py: 3 }} spacing={2}>
			<Grid item xs={12}>
				<Link to="/videos/me">
					<Button startIcon={<ArrowBackIcon />}> Go Back</Button>
				</Link>
			</Grid>

			<Grid item xs={12}>
				<VideoForm mode="create"></VideoForm>
			</Grid>
		</Grid>
	)
}
