import {
	Drawer,
	Toolbar,
	List,
	ListItem,
	ListItemButton,
	ListItemText
} from '@mui/material'
import { FC } from 'react'
import { Link } from 'react-router-dom'
import { drawerWidth, sidebarLinks } from '../constants/settings.constants'

interface Props {
	open: boolean
	onClose?: () => void
}
export const Sidebar: FC<Props> = ({ open, onClose }) => {
	return (
		<>
			<Drawer
				variant="temporary"
				onClose={onClose}
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
				open={open}
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
						<ListItem
							component={Link}
							to={link.to}
							disablePadding
							key={`link-${index}`}
						>
							<ListItemButton>
								<ListItemText primary={link.text} />
							</ListItemButton>
						</ListItem>
					))}
				</List>
			</Drawer>
		</>
	)
}
