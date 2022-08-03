import { LoadingButton } from '@mui/lab'
import {
	Box,
	Typography,
	TextField,
	Divider,
	Snackbar,
	Alert,
	AlertColor
} from '@mui/material'
import { useFormik } from 'formik'
import { Link, useNavigate } from 'react-router-dom'
import auth from '../../services/auth'
import * as Yup from 'yup'
import { AuthSignUpRequest } from '../../services/auth.request'
import { useState } from 'react'
import { SnackbarValues } from '../../models/snackbar-values'

const SignUpSchema = Yup.object().shape({
	name: Yup.string().required('This Field is required'),
	password: Yup.string().required('This Field is required'),
	email: Yup.string()
		.email('This Field is not a valid email')
		.required('This field is required')
})

export const SignUp = () => {
	const [snackbarState, setSnackBarState] = useState<SnackbarValues>({
		open: false,
		message: '',
		type: 'success'
	})
	const navigate = useNavigate()

	const handleOnSubmit = async (
		values: AuthSignUpRequest,
		{ setSubmitting, resetForm }: any
	) => {
		setSubmitting(true)
		try {
			await auth.signUp(values)
			setSubmitting(false)
			resetForm()
			setSnackBarState({
				open: true,
				type: 'success',
				message: 'Account created successfully'
			})

			setTimeout(() => {
				navigate('/auth/signin')
			}, 3000)
		} catch (e) {
			setSubmitting(false)
			setSnackBarState({
				open: true,
				type: 'error',
				message: 'Error, your account could not be created try later'
			})
			console.error(e)
		}
	}

	const formik = useFormik({
		initialValues: { email: '', password: '', name: '' },
		onSubmit: handleOnSubmit,
		validationSchema: SignUpSchema
	})

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
				Sign up
			</Typography>
			<Typography variant="body1" sx={{ textAlign: 'center' }}>
				Please, fill the following information in order to create your account.
			</Typography>

			<form onSubmit={formik.handleSubmit}>
				<TextField
					margin="normal"
					fullWidth
					error={formik.touched.name && formik.errors.name ? true : false}
					helperText={formik.touched.name && formik.errors.name}
					defaultValue={formik.values.name}
					name="name"
					label="Name"
					type="text"
					id="name"
					onBlur={formik.handleBlur}
					onChange={formik.handleChange}
					autoComplete="current-password"
				/>
				<TextField
					margin="normal"
					fullWidth
					defaultValue={formik.values.email}
					error={formik.touched.email && formik.errors.email ? true : false}
					helperText={formik.touched.email && formik.errors.email}
					id="email"
					label="Email Address"
					name="email"
					autoComplete="email"
					onBlur={formik.handleBlur}
					onChange={formik.handleChange}
				/>

				<TextField
					margin="normal"
					fullWidth
					error={
						formik.touched.password && formik.errors.password ? true : false
					}
					helperText={formik.touched.password && formik.errors.password}
					defaultValue={formik.values.password}
					name="password"
					label="Password"
					type="password"
					id="password"
					onBlur={formik.handleBlur}
					onChange={formik.handleChange}
					autoComplete="current-password"
				/>

				<LoadingButton
					size={'large'}
					fullWidth
					type="submit"
					variant="contained"
					sx={{ mt: 2 }}
					disableElevation
					loading={formik.isSubmitting}
				>
					Create my account
				</LoadingButton>
			</form>

			<Divider sx={{ mt: 2, mb: 2 }} />

			<Typography
				component={'p'}
				sx={{ textAlign: 'center' }}
				variant="caption"
			>
				Already have and account? just click{' '}
				<Link className="link" to="/auth/signin">
					here
				</Link>
			</Typography>
			<Snackbar
				anchorOrigin={{
					vertical: 'top',
					horizontal: 'center'
				}}
				open={snackbarState.open}
				autoHideDuration={6000}
				onClose={() => setSnackBarState({ ...snackbarState, open: false })}
			>
				<Alert
					onClose={() => setSnackBarState({ ...snackbarState, open: false })}
					severity={snackbarState.type}
					sx={{ width: '100%' }}
				>
					{snackbarState.message}
				</Alert>
			</Snackbar>
		</Box>
	)
}

export default SignUp
