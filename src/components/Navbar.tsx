import {
	AppBar,
	Container,
	Toolbar,
	Typography,
	Button,
	Grid
} from '@mui/material'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'

export const Navbar = () => {
	const [user] = useState(null)
	return (
		<AppBar
			sx={{
				boxShadow: 0
			}}
			position="sticky"
		>
			<Container maxWidth="lg">
				<Toolbar>
					<Grid
						container
						direction="row"
						justifyContent="space-between"
						alignItems="center"
						spacing={4}
					>
						<Grid item>
							<Typography variant="h6">Me-Tube</Typography>
						</Grid>

						{user != null ? (
							<Grid item>User</Grid>
						) : (
							<Grid item>
								<NavLink to="/auth/signin">
									<Button variant="contained" sx={{ mr: 3 }} disableElevation>
										Sign In
									</Button>
								</NavLink>
								<NavLink to="/auth/signup">
									<Button
										variant="contained"
										color="secondary"
										disableElevation
									>
										Sign Up
									</Button>
								</NavLink>
							</Grid>
						)}
					</Grid>
				</Toolbar>
			</Container>
		</AppBar>
	)
}
