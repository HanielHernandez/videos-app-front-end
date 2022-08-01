import {
	AppBar,
	Container,
	Toolbar,
	Typography,
	Button,
	Grid,
	IconButton,
	Avatar,
	Menu,
	MenuItem,
	Divider
} from '@mui/material'
import { useMemo, useRef, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { SETTINGS } from '../constants/settings.constants'
import { useAuth } from '../hooks/use.auth'
import { AVATAR_API_URL } from '../services/constants'

export const Navbar = () => {
	const { user, signOut } = useAuth()

	const userAvatar = useRef(null)
	const [isMenuOpen, setIsMenuOpen] = useState(false)

	const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null)

	const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)

	const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElNav(event.currentTarget)
	}
	const handleOpenUserMenu = () => {
		setIsMenuOpen(!isMenuOpen)
	}

	const handleCloseNavMenu = () => {
		setAnchorElNav(null)
	}

	const handleCloseUserMenu = () => {
		setAnchorElUser(null)
	}
	const avatarUrL = useMemo(
		() =>
			user?.photoURL
				? user?.photoURL
				: `${AVATAR_API_URL}?name=${user?.name}&background=f5f5f5&color=919191&size=56`,
		[user]
	)
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
							<Grid item>
								<IconButton
									ref={userAvatar}
									onClick={handleOpenUserMenu}
									sx={{ p: 0 }}
								>
									<Avatar alt="profile picture" src={avatarUrL}></Avatar>
								</IconButton>
								<Menu
									sx={{ mt: '45px' }}
									id="menu-appbar"
									anchorEl={userAvatar.current}
									anchorOrigin={{
										vertical: 'top',
										horizontal: 'right'
									}}
									keepMounted
									transformOrigin={{
										vertical: 'top',
										horizontal: 'right'
									}}
									open={isMenuOpen}
									onClose={handleOpenUserMenu}
								>
									{SETTINGS.map((setting, index) => (
										<MenuItem
											key={`setting-${index}`}
											onClick={handleCloseUserMenu}
										>
											<Link to={setting.path}>
												<Typography textAlign="center">
													{setting.text}
												</Typography>
											</Link>
										</MenuItem>
									))}
									<Divider />
									<MenuItem onClick={() => signOut()}>
										<Typography textAlign="center">Sign Out</Typography>
									</MenuItem>
								</Menu>
							</Grid>
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
