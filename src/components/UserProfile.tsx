import { LoadingButton } from '@mui/lab'
import { Avatar, Card, CardHeader, Grid, Typography } from '@mui/material'
import { FC } from 'react'
import { useFollowUserMutation } from '../features'
import { User } from '../models'

interface Props {
	user: User
	disableSubscribe?: boolean
	onSubscribed?: () => void
}

export const UserProfile: FC<Props> = ({
	user,
	onSubscribed,
	disableSubscribe
}) => {
	const [followUser, { isLoading: isFollowing }] = useFollowUserMutation()
	const handleOnFollowUser = async () => {
		try {
			await followUser(user.id).unwrap()

			onSubscribed ? onSubscribed() : {}
		} catch (e) {
			console.error(e)
		}
	}

	return (
		<Card
			variant="outlined"
			sx={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
		>
			<CardHeader
				avatar={<Avatar sx={{ width: 56, height: 56 }} src={user.photoURL} />}
				title={
					<Typography
						variant="h5"
						sx={{
							fontWeight: 'medium',
							display: 'block',
							overflow: 'hidden',
							whiteSpace: 'normal',
							textOverflow: 'ellipsis'
						}}
					>
						{user.name}
					</Typography>
				}
				subheader={
					<Typography variant="subtitle1" sx={{ color: '#757575' }}>
						{user.followers} Followers
					</Typography>
				}
				action={
					!disableSubscribe && (
						<LoadingButton
							sx={{
								marginTop: 1,
								marginRight: 1,
								marginBottom: 1
							}}
							loading={isFollowing}
							color={user.subscribed != null ? 'inherit' : 'primary'}
							onClick={() => handleOnFollowUser()}
							variant={'contained'}
							disableElevation
						>
							{user.subscribed != null ? 'Subscribed' : 'Subscribe'}
						</LoadingButton>
					)
				}
			/>
		</Card>
	)
}
