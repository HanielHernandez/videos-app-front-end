import { Navigate } from 'react-router-dom'
import { All } from '../views/videos/All'
import { EditVideo } from '../views/videos/EditVIdeo'
import { FollowingVideos } from '../views/videos/Following'
import { MyVideos } from '../views/videos/MyVideos'
import { NewVideo } from '../views/videos/NewVideo'
import { VideosDetails } from '../views/videos/VideosDetail'

export const videosRoutes = [
	{
		path: ':id',
		element: <VideosDetails />
	},
	{
		path: 'me',
		element: <MyVideos />
	},
	{
		path: '',
		index: true,
		element: <All />
	},

	{
		path: 'new',
		element: <NewVideo />
	},
	{
		path: 'following',
		element: <FollowingVideos />
	},
	{
		path: ':id/edit',
		element: <EditVideo />
	}
]
