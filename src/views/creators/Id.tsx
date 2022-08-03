import { Grid } from '@mui/material'
import { skipToken } from '@reduxjs/toolkit/dist/query'
import { useParams } from 'react-router-dom'
import { UserProfileForm, VideoList } from '../../components'
import { UserProfile } from '../../components/UserProfile'
import { useGetUserQuery } from '../../features'
import { useAuth } from '../../hooks/use.auth'

export const Id = () => {
	const { id } = useParams()
	const {
		data: user,
		isLoading,
		refetch
	} = useGetUserQuery(id == null ? skipToken : id)

	return (
		<Grid container>
			<Grid item xs={12}>
				{user && (
					<>
						<UserProfile onSubscribed={() => refetch()} user={user} />
						<VideoList userId={user.id} />
					</>
				)}
			</Grid>
		</Grid>
	)
}
