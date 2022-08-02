import { Grid, Button } from '@mui/material'
import { Link, useParams } from 'react-router-dom'
import { VideoForm } from '../../components/VideoForm'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useGetVideoQuery } from '../../features/videos.slice'
import { skipToken } from '@reduxjs/toolkit/dist/query/react'

export const EditVideo = () => {
	const { id } = useParams()
	const { data: video } = useGetVideoQuery(id == undefined ? skipToken : id)

	return (
		<Grid container sx={{ py: 3 }} spacing={2}>
			<Grid item xs={12}>
				<Link to="/videos/me">
					<Button startIcon={<ArrowBackIcon />}> Go Back</Button>
				</Link>
			</Grid>

			<Grid item xs={12}>
				{video && <VideoForm mode="edit" video={video}></VideoForm>}
			</Grid>
		</Grid>
	)
}
