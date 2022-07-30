import { Box, Button, Divider, TextField, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

export const SignIn = () => {
	return (
		<Box
			sx={{
				backgroundColor: '#fff',
				border: 1,
				p: 2,
				borderRadius: 1,
				borderColor: 'grey.300'
			}}
		>
			<Typography variant="h4" sx={{ mb: 2, textAlign: 'center' }}>
				Sign In
			</Typography>
			<Typography variant="body1" sx={{ textAlign: 'center' }}>
				Please, fill the following information
			</Typography>

			<TextField
				margin="normal"
				required
				fullWidth
				id="email"
				label="Email Address"
				name="email"
				autoComplete="email"
				autoFocus
			/>
			<TextField
				margin="normal"
				required
				fullWidth
				name="password"
				label="Password"
				type="password"
				id="password"
				autoComplete="current-password"
			/>

			<Button
				size={'large'}
				fullWidth
				variant="contained"
				sx={{ mt: 2 }}
				disableElevation
			>
				Go
			</Button>
			<Divider sx={{ mt: 2, mb: 2 }} />

			<Typography
				component={'p'}
				sx={{ textAlign: 'center' }}
				variant="caption"
			>
				Dont have and account?, click{' '}
				<Link className="link" to="/auth/signup">
					here{' '}
				</Link>
			</Typography>
		</Box>
	)
}
export default SignIn
