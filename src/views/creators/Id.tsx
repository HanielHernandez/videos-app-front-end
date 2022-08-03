import { Grid } from '@mui/material'
import { skipToken } from '@reduxjs/toolkit/dist/query'
import { useParams } from 'react-router-dom'
import { VideoList } from '../../components'
import { DefaultLayout } from '../../components/DefaultLayout'
import { UserProfile } from '../../components/UserProfile'
import { useGetUserQuery } from '../../features'

export const Id = () => {
	const { id } = useParams()
	const { data: user, refetch } = useGetUserQuery(id == null ? skipToken : id)

	return (
		<DefaultLayout withSidebar>
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
		</DefaultLayout>
	)
}
