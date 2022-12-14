export const SETTINGS = [
	{
		text: 'Edit my  Profile',
		path: '/me'
	}
]

export const drawerWidth = '240px'

export const sidebarLinks = [
	{
		to: '/videos',
		text: 'All videos'
	},
	{ to: '/videos/me', text: 'My Videos' },
	{ to: '/videos/following', text: 'Following Creators Videos' }
]

export const videoUserCardConf = {
	avatarSize: {
		width: 48,
		height: 48
	},
	cardVariant: undefined,
	headerPadding: 0,
	titleVariation: 'body1',
	subHeaderVariation: 'body2',
	padding: 0
}

export const userCardConf = {
	padding: 4,
	avatarSize: {
		width: 48,
		height: 48
	},
	cardVariant: undefined,
	headerPadding: 2,
	titleVariation: 'h6',
	subHeaderVariation: 'subtitle2'
}
