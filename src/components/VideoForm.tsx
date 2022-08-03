import { LoadingButton } from '@mui/lab'
import {
	CardContent,
	TextField,
	Card,
	CardHeader,
	Snackbar,
	Alert,
	CardActions
} from '@mui/material'
import { useFormik } from 'formik'
import { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import {
	useCreateVideoMutation,
	useUpdateVideoMutation
} from '../features/videos.slice'
import { useAuth } from '../hooks/use.auth'
import { CreateVideoValues } from '../models/create-video-values'
import { SnackbarValues } from '../models/snackbar-values'
import { Video } from '../models/videos'
interface Props {
	mode: string
	video?: Video
}

const initialValues = {
	url: '',
	miniature: '',
	title: '',
	description: ''
}
const requiredFieldMessage = 'This field is requried'
const invalidUrl = 'Invalid url '
const validationSchema = yup.object().shape({
	url: yup.string().required(requiredFieldMessage).url(invalidUrl),
	miniature: yup.string().required(requiredFieldMessage).url(invalidUrl),
	title: yup.string().required(requiredFieldMessage),
	description: yup.string().required(requiredFieldMessage)
})

const getUpdateValuesFromVideo = (video: Video) => {
	const { title, description, url, miniature, published } = video
	return { title, description, url, miniature, published }
}

export const VideoForm: FC<Props> = ({ mode, video }) => {
	const [createVideo] = useCreateVideoMutation()
	const [updateVideo] = useUpdateVideoMutation()
	const navigate = useNavigate()
	const [snackbarState, setSnackBarState] = useState<SnackbarValues>({
		open: false,
		message: '',
		type: 'success'
	})

	const { user } = useAuth()
	const handleOnSubmit = async (values: CreateVideoValues) => {
		if (user) {
			values.publishedById = user.id
		}

		try {
			await (mode == 'edit' && video
				? updateVideo({ ...values, id: video.id }).unwrap()
				: createVideo(values).unwrap())
			formik.resetForm()
			setSnackBarState({
				type: 'success',
				open: true,
				message: 'Video Saved succesfuly'
			})
			setTimeout(() => {
				navigate('/videos/me')
			}, 6000)
		} catch (e) {
			setSnackBarState({
				type: 'error',
				open: true,
				message: 'Error, video could not be saved again later'
			})
			console.error(e)
		}
	}

	const formik = useFormik({
		initialValues:
			mode == 'edit' && video ? getUpdateValuesFromVideo(video) : initialValues,
		validationSchema,
		onSubmit: handleOnSubmit
	})

	return (
		<Card variant="outlined">
			<form onSubmit={formik.handleSubmit}>
				<CardHeader
					sx={{ pb: 0 }}
					title={`${mode == 'edit' ? 'Edit' : 'New'} Video`}
				/>
				<CardContent>
					<TextField
						margin="dense"
						fullWidth
						defaultValue={formik.values.url}
						error={formik.touched.url && formik.errors.url ? true : false}
						helperText={formik.touched.url && formik.errors.url}
						id="url"
						type={'text'}
						label="Video URL"
						name="url"
						onChange={formik.handleChange}
					/>
					<TextField
						margin="dense"
						fullWidth
						type={'text'}
						defaultValue={formik.values.miniature}
						error={
							formik.touched.miniature && formik.errors.miniature ? true : false
						}
						helperText={formik.touched.miniature && formik.errors.miniature}
						id="miniature"
						label="Miniature URL"
						name="miniature"
						onChange={formik.handleChange}
					/>
					<TextField
						margin="dense"
						type={'text'}
						fullWidth
						defaultValue={formik.values.title}
						error={formik.touched.title && formik.errors.title ? true : false}
						helperText={formik.touched.title && formik.errors.title}
						id="Title"
						label="Title"
						name="title"
						onChange={formik.handleChange}
					/>
					<TextField
						margin="dense"
						type={'text'}
						fullWidth
						defaultValue={formik.values.description}
						error={
							formik.touched.description && formik.errors.description
								? true
								: false
						}
						helperText={formik.touched.description && formik.errors.description}
						id="Description "
						multiline
						rows={4}
						label="Description"
						name="description"
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
						Save Video
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
