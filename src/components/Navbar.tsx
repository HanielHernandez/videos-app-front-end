import {
	AppBar,
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
import React, { FC, useMemo, useRef, useState } from 'react'
import {
	createSearchParams,
	Link,
	NavLink,
	useNavigate
} from 'react-router-dom'
import { SETTINGS } from '../constants/settings.constants'
import { useAuth } from '../hooks/use.auth'
import { AVATAR_API_URL } from '../services/constants'
import MenuIcon from '@mui/icons-material/Menu'
import { SearchContainer, SearchInput, SearchButton } from './Navbar.styles'

interface Props {
	handleDrawerToggle: () => void
}
export const Navbar: FC<Props> = ({ handleDrawerToggle }) => {
	const navigate = useNavigate()
	const { user, signOut } = useAuth()
	const userAvatar = useRef(null)
	const [isMenuOpen, setIsMenuOpen] = useState(false)

	const handleOpenUserMenu = () => {
		setIsMenuOpen(!isMenuOpen)
	}

	const handleCloseUserMenu = () => {
		setIsMenuOpen(false)
	}
	const avatarUrL = useMemo(
		() =>
			user?.photoURL
				? user?.photoURL
				: `${AVATAR_API_URL}?name=${user?.name}&background=f5f5f5&color=919191&size=56`,
		[user]
	)

	const [search, setSearch] = useState('')

	const onSearchFormSubmit = (event: React.FormEvent) => {
		event.preventDefault()
		if (search != '')
			navigate('/videos?' + createSearchParams({ search }).toString())
	}

	return (
		<AppBar
			sx={{ boxShadow: 0, zIndex: (theme) => theme.zIndex.drawer + 1 }}
			position="fixed"
		>
			<Toolbar>
				<Grid
					container
					direction="row"
					justifyContent="space-between"
					alignItems="center"
					spacing={4}
				>
					<Grid item alignItems="center" sx={{ flexWrap: 'nowrap' }}>
						<IconButton
							color="inherit"
							aria-label="open drawer"
							edge="start"
							onClick={() => handleDrawerToggle()}
							sx={{ mr: 2, display: { sm: 'none' } }}
						>
							<MenuIcon />
						</IconButton>
						<Link to="/" style={{ display: 'inline-block' }}>
							<Typography sx={{ color: '#fff' }} variant="h6">
								Me-Tube
							</Typography>
						</Link>
					</Grid>

					{user != null && (
						<Grid item md={4} sx={{ display: { md: 'flex', xs: 'none' } }}>
							<form onSubmit={onSearchFormSubmit} style={{ width: '100%' }}>
								<SearchContainer>
									<SearchInput
										type="search"
										name="search"
										value={search}
										onChange={(event) => setSearch(event.target.value)}
										placeholder="Search Videos"
										id="search"
									/>
									<SearchButton type="submit"> Search</SearchButton>
								</SearchContainer>
							</form>
						</Grid>
					)}

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
											<Typography textAlign="center">{setting.text}</Typography>
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
								<Button variant="contained" color="inherit" disableElevation>
									Sign Up
								</Button>
							</NavLink>
						</Grid>
					)}
				</Grid>
			</Toolbar>
		</AppBar>
	)
}
