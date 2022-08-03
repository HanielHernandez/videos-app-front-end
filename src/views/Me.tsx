import { Grid } from '@mui/material'
import { skipToken } from '@reduxjs/toolkit/dist/query'
import { UserProfileForm } from '../components'
import { DefaultLayout } from '../components/DefaultLayout'
import { useGetUserQuery } from '../features'
import { useAuth } from '../hooks/use.auth'
export const MyProfile = () => {
	const { user } = useAuth()
	const { data: userProfile } = useGetUserQuery(
		user == null ? skipToken : user.id
	)

	return (
		<DefaultLayout withSidebar>
			<Grid container sx={{ py: 3 }}>
				<Grid item xs={12}>
					{userProfile && <UserProfileForm user={userProfile} />}
				</Grid>
			</Grid>
		</DefaultLayout>
	)
}
