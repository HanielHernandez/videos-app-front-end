import { useSelect } from '@mui/base'
import { createApiService } from '../services/api.services'
import { RootState } from '../store'

export const useApi = <T>(sliceName: string, baseUrl: string) => {
	const { index } = createApiService<T>(baseUrl)
	const { items } = useSelect((state: RootState) => state[sliceName])
}
