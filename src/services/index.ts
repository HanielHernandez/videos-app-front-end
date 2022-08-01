import { http } from './http'

export class ApiService {
	url: string
	constructor(protected serviceUrl: string) {
		this.url = serviceUrl
	}

	index(params: any): Promise<any> {
		return http.get(this.url, params)
	}
}
