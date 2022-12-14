import { Grid } from '@mui/material'
import { Outlet } from 'react-router-dom'
import { DefaultLayout } from '../../components/DefaultLayout'

export const Auth = () => {
	return (
		<DefaultLayout>
			<Grid
				sx={{
					pt: 4
				}}
				container
				direction="row"
				justifyContent="center"
				alignItems="center"
			>
				<Grid item xs={12} md={6} lg={4}>
					<Outlet />
				</Grid>
			</Grid>
		</DefaultLayout>
	)
}
