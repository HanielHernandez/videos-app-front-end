import { Box, Divider, TextField, Typography } from '@mui/material'
import { useFormik } from 'formik'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import auth from '../../services/auth'
import LoadingButton from '@mui/lab/LoadingButton'
import { useAuth } from '../../hooks/use.auth'

interface Values {
	email: string
	password: string
}
const SignInSchema = Yup.object().shape({
	password: Yup.string().required('This Field is required'),
	email: Yup.string()
		.email('This Field is not a valid email')
		.required('This field is required')
})
export const SignIn = () => {
	const { signIn } = useAuth()
	const navigate = useNavigate()
	const handleOnSubmit = async (
		values: Values,
		{ setSubmitting }: { setSubmitting: (val: boolean) => void }
	) => {
		setSubmitting(true)
		try {
			setSubmitting(false)
			await signIn(values)
			navigate('/')
		} catch (e) {
			setSubmitting(false)
			console.error(e)
		}
	}

	const formik = useFormik({
		initialValues: { email: '', password: '' },
		onSubmit: handleOnSubmit,
		validationSchema: SignInSchema
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
				Sign In
			</Typography>
			<Typography variant="body1" sx={{ textAlign: 'center' }}>
				Please, fill the following information
			</Typography>

			<form onSubmit={formik.handleSubmit}>
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
					Go
				</LoadingButton>
			</form>

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
