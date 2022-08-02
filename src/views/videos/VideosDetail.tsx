import { useParams } from 'react-router-dom'
import { skipToken } from '@reduxjs/toolkit/query/react'
import { VideoPlayer } from '../../components/VideoPlayer'
import { useGetVideoQuery } from '../../features/videos.slice'

export const VideosDetails = () => {
	const { id } = useParams()
	const { data: video, isLoading } = useGetVideoQuery(
		id == undefined ? skipToken : id
	)

	return (
		<div>
			{isLoading && 'loading...'}
			{video && <VideoPlayer video={video} />}
		</div>
	)
}
