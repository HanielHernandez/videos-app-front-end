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
import { useRoutes, Link, useLocation } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import routes from './routes'
const drawerWidth = 240

function App() {
	const myRoutes = useRoutes(routes)
	const { pathname } = useLocation()
	const [isDrawerOpen, setIsDrawerOpen] = useState(false)

	return <div className="App">{myRoutes}</div>
}

export default App
