import { Outlet, useRoutes } from 'react-router-dom'
import './App.css'
import routes from './routes'

function App() {
	//** Test */

	const myRoutes = useRoutes(routes)
	return (
		<div className="App">
			{myRoutes}
			<Outlet />
		</div>
	)
}

export default App
