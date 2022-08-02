import { EditVideo } from '../views/videos/EditVIdeo'
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
		path: 'new',
		element: <NewVideo />
	},
	{
		path: ':id/edit',
		element: <EditVideo />
	}
]
