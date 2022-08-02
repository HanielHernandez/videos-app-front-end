import { Box, Fab, IconButton } from '@mui/material'
import { styled } from '@mui/system'

export const CustomVideoPlayer = styled('video')({
	width: '100%',
	height: '100%',
	display: 'block',
	maxHeight: '648px',
	minHiehgt: '128px'
})

export const VideoPublisher = styled(Box)({
	display: 'flex',
	padding: '1rem 0 '
})
