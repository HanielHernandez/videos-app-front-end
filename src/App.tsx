import { Box, Container } from '@mui/material'
import { useRoutes } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import routes from './routes'

function App() {
	//** Test */

	const myRoutes = useRoutes(routes)
	console.log(import.meta.env.VITE_API_URL)
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
				<Container maxWidth="lg" sx={{ mt: 4, height: '100%', mb: 4 }}>
					{myRoutes}
				</Container>
			</Box>
		</div>
	)
}

export default App
