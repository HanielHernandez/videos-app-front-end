import { blue, grey } from '@mui/material/colors'
import red from '@mui/material/colors/red'
import { createTheme } from '@mui/material/styles'

const bodyColor = grey[600]
const theme = createTheme({
	typography: {
		body1: {
			color: bodyColor
		},
		caption: {
			color: bodyColor
		},
		fontFamily: [
			'-apple-system',
			'BlinkMacSystemFont',
			'"Segoe UI"',
			'Roboto',
			'"Helvetica Neue"',
			'Arial',
			'sans-serif',
			'"Apple Color Emoji"',
			'"Segoe UI Emoji"',
			'"Segoe UI Symbol"'
		].join(',')
	},
	palette: {
		primary: {
			main: blue[600],
			contrastText: '#fff'
		},
		secondary: {
			main: '#fff',
			contrastText: blue[600]
		},
		error: {
			main: red.A400
		}
	}
})

export default theme
