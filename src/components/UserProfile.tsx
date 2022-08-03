import { LoadingButton } from '@mui/lab'
import {
	Avatar,
	Card,
	CardHeader,
	Grid,
	Typography,
	TypographyPropsVariantOverrides
} from '@mui/material'
import { FC, useMemo } from 'react'
import {
	userCardConf,
	videoUserCardConf
} from '../constants/settings.constants'
import { useFollowUserMutation } from '../features'
import { User } from '../models'

interface Props {
	user: User
	isForVideo?: boolean
	disableSubscribe?: boolean
	onSubscribed?: () => void
}

export const UserProfile: FC<Props> = ({
	user,
	onSubscribed,
	isForVideo,
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

	const {
		cardVariant,
		headerPadding,
		subHeaderVariation,
		avatarSize,
		titleVariation
	} = useMemo(() => {
		return isForVideo ? videoUserCardConf : userCardConf
	}, [isForVideo])

	return (
		<Card
			variant={cardVariant}
			sx={{
				boxShadow: 'none',
				borderTopLeftRadius: 0,
				borderTopRightRadius: 0
			}}
		>
			<CardHeader
				sx={{
					px: headerPadding
				}}
				avatar={<Avatar sx={avatarSize} src={user.photoURL} />}
				title={
					<Typography
						variant={titleVariation}
						sx={{
							color: '#191919',
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
					<Typography variant={subHeaderVariation} sx={{ color: '#757575' }}>
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
