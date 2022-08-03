import { Outlet } from 'react-router-dom'
import { DefaultLayout } from '../../components/DefaultLayout'

export const Videos = () => {
	return (
		<DefaultLayout withSidebar>
			<Outlet />
		</DefaultLayout>
	)
}

export default Videos
