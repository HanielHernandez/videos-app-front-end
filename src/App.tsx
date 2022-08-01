import { Box, Container } from '@mui/material'
import { useRoutes } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import routes from './routes'

function App() {
	const myRoutes = useRoutes(routes)
	return (
		<div className="App">
			<Navbar />
			<Box
				component="main"
				sx={{
					backgroundColor: (theme) =>
						theme.palette.mode === 'light'
							? theme.palette.grey[100]
							: theme.palette.grey[900],
					flexGrow: 1,
					height: 'calc(100vh - 64px)',
					overflow: 'auto'
				}}
			>
				<Container maxWidth="lg" sx={{ height: '100%' }}>
					{myRoutes}
				</Container>
			</Box>
		</div>
	)
}

export default App
