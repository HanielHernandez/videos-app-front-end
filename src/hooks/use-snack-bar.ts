import { useState } from 'react'
import { SnackbarValues } from '../models/snackbar-values'

export const useSnackBar = () => {
	const [snackbarState, setSnackBarState] = useState<SnackbarValues>({
		open: false,
		message: '',
		type: 'success'
	})

	return {
		snackbarState,
		setSnackBarState
	}
}
