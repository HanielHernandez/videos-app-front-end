import { styled } from '@mui/system'

export const SearchContainer = styled('div')({
	display: 'flex',
	flexWrap: 'nowrap'
})

export const SearchInput = styled('input')({
	padding: '1rem',
	width: '100%',
	fontSize: '1rem',
	borderRadius: '0.25rem',
	borderTopRightRadius: 0,
	borderBottomRightRadius: 0,
	border: '1px solid rgba(0,0,0,0.3)',
	outline: 'none'
})

export const SearchButton = styled('button')({
	padding: '0.75rem 1rem',
	fontSize: '1rem',
	opacity: 0.75,
	'&:hover': {
		backgroundColor: 1
	},
	border: '1px solid rgba(0,0,0,0.3)',
	borderRadius: '0.25rem',
	borderTopLeftRadius: 0,
	borderBottomLeftRadius: 0
})
