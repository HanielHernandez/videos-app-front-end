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
import { useRoutes, Link, useLocation, Outlet } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import routes from './routes'
const drawerWidth = 240

function App() {
	const myRoutes = useRoutes(routes)

	return myRoutes
}

export default App
