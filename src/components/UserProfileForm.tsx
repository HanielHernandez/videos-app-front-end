import {
	Alert,
	Card,
	CardActions,
	CardContent,
	CardHeader,
	Snackbar,
	TextField
} from '@mui/material'
import { useUpdateUserMutation } from '../features'
import { User } from '../models'
import * as yup from 'yup'
import { useFormik } from 'formik'
import { UpdateUsersValues } from '../models/update-user-valuesl'
import { useSnackBar } from '../hooks/use-snack-bar'
import { LoadingButton } from '@mui/lab'
import { FC } from 'react'

const requiredFieldMessage = 'This field is requried'
const invalidUrl = 'Invalid url'

const validationSchema = yup.object().shape({
	photoURL: yup.string().required(requiredFieldMessage).url(invalidUrl),
	name: yup.string().required(requiredFieldMessage),
	email: yup.string().email('Invalid Email').required(requiredFieldMessage)
})

const getUpdateValuesFromUser = (user: User) => {
	const { id, photoURL, name, email } = user
	return { id, photoURL, name, email }
}

interface Props {
	user: User
}
export const UserProfileForm: FC<Props> = ({ user }) => {
	const [updateUser] = useUpdateUserMutation()
	const { snackbarState, setSnackBarState } = useSnackBar()
	const onSubmit = async (values: UpdateUsersValues) => {
		try {
			await updateUser(values).unwrap()
			setSnackBarState({
				type: 'success',
				open: true,
				message: 'Profile Saved succesfuly'
			})
		} catch (e) {
			console.error(e)
			setSnackBarState({
				type: 'error',
				open: true,
				message: 'Profile Saved succesfuly'
			})
		}
	}

	const formik = useFormik({
		initialValues: getUpdateValuesFromUser(user),
		validationSchema,
		onSubmit
	})
	return (
		<Card variant="outlined">
			<form onSubmit={formik.handleSubmit}>
				<CardHeader sx={{ pb: 0 }} title="User Profile" />
				<CardContent>
					<TextField
						margin="dense"
						type={'text'}
						fullWidth
						defaultValue={formik.values.name}
						error={formik.touched.name && formik.errors.name ? true : false}
						helperText={formik.touched.name && formik.errors.name}
						id="name"
						label="Name"
						name="name"
						onChange={formik.handleChange}
					/>
					<TextField
						margin="dense"
						fullWidth
						defaultValue={formik.values.photoURL}
						error={
							formik.touched.photoURL && formik.errors.photoURL ? true : false
						}
						helperText={formik.touched.photoURL && formik.errors.photoURL}
						id="photoURL"
						type={'text'}
						label="Profile Picture URL"
						name="photoURL"
						onChange={formik.handleChange}
					/>
					<TextField
						margin="dense"
						fullWidth
						type={'email'}
						defaultValue={formik.values.email}
						error={formik.touched.email && formik.errors.email ? true : false}
						helperText={formik.touched.email && formik.errors.email}
						id="email"
						label="Email "
						name="email"
						onChange={formik.handleChange}
					/>
				</CardContent>
				<CardActions sx={{ px: 2, pt: 0, pb: 2 }}>
					<LoadingButton
						type="submit"
						size="large"
						loading={formik.isSubmitting}
						variant="contained"
						disableElevation
					>
						Save Profile
					</LoadingButton>
				</CardActions>
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
			</form>
		</Card>
	)
}
