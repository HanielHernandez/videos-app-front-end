import {
	Box,
	Container,
	Drawer,
	List,
	ListItem,
	ListItemText,
	ListItemButton,
	Toolbar
} from '@mui/material'
import { useState } from 'react'
import { useRoutes, Link } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import routes from './routes'
const drawerWidth = 240

function App() {
	const myRoutes = useRoutes(routes)
	const [isDrawerOpen, setIsDrawerOpen] = useState(false)

	const sidebarLinks = [
		{
			to: '/',
			text: 'All videos'
		},
		{ to: '/videos/me', text: 'My Videos' },
		{ to: '/videos/following', text: 'Following Videos' }
	]

	return (
		<div className="App">
			<Navbar handleDrawerToggle={() => setIsDrawerOpen(!isDrawerOpen)} />

			<Drawer
				variant="temporary"
				sx={{
					display: {
						xs: 'block',
						sm: 'none'
					},
					width: drawerWidth,
					flexShrink: 0,
					['& .MuiDrawer-paper']: {
						width: drawerWidth,
						boxSizing: 'border-box'
					}
				}}
				anchor="left"
				open={isDrawerOpen}
			>
				<Toolbar />
				<List>
					{sidebarLinks.map((link, index) => (
						<ListItem
							component={Link}
							to={link.to}
							key={`link-${index}`}
							disablePadding
						>
							<ListItemButton>
								<ListItemText primary={link.text} />
							</ListItemButton>
						</ListItem>
					))}
				</List>
			</Drawer>
			<Drawer
				variant="permanent"
				sx={{
					display: {
						xs: 'none',
						sm: 'block'
					},
					width: drawerWidth,
					flexShrink: 0,
					['& .MuiDrawer-paper']: {
						width: drawerWidth,
						boxSizing: 'border-box'
					}
				}}
				anchor="left"
			>
				<Toolbar />
				<List>
					{sidebarLinks.map((link, index) => (
						<ListItem disablePadding key={`link-${index}`}>
							<ListItemButton>
								<Link to={link.to}>
									<ListItemText primary={link.text} />
								</Link>
							</ListItemButton>
						</ListItem>
					))}
				</List>
			</Drawer>
			<Box
				component="main"
				sx={{
					paddingLeft: { xs: '0px', sm: '240px' },
					backgroundColor: 'grey.100',
					height: '100vh',
					overflowY: 'auto'
				}}
			>
				<Toolbar />
				<Container maxWidth="lg" sx={{ height: '100%' }}>
					{myRoutes}
				</Container>
			</Box>
		</div>
	)
}

export default App
