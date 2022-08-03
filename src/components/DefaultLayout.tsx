import { Box, Toolbar, Container } from '@mui/material'
import { FC, useState } from 'react'
import { Navbar } from './Navbar'
import { Sidebar } from './Sidebar'

interface Props {
	withSidebar?: boolean
	children?: React.ReactNode
}
export const DefaultLayout: FC<Props> = ({ children, withSidebar }) => {
	const [isDrawerOpen, setIsDrawerOpen] = useState(false)
	return (
		<>
			<Navbar handleDrawerToggle={() => setIsDrawerOpen(!isDrawerOpen)} />
			{withSidebar && <Sidebar open={isDrawerOpen} />}
			<Box
				component="main"
				sx={{
					paddingLeft: { xs: '0px', sm: withSidebar ? '240px' : '0px' },
					backgroundColor: 'grey.100',
					height: '100vh',
					overflowY: 'auto'
				}}
			>
				<Toolbar />
				<Container maxWidth="lg" sx={{ height: '100%' }}>
					{children}
				</Container>
			</Box>
		</>
	)
}
