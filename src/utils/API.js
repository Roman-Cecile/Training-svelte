import axios from "axios";

export const API_ODYSSEE = "http://api.odyssee.staging.vlq16.iliad.fr";
export const API_BANO = "http://api.odyssee.staging.vlq16.iliad.fr:7878";

class ErrorAPI extends Error {
	constructor(response) {
		super(response.statusText);
		this.response = response;
	}

	getResponse() {
		return this.response;
	}
}

class API {
	static apis = {};

	url = undefined;

	constructor(url) {
		this.url = url;
		this.headers = { "Content-Type": "application/json" };
	}

	static handleErrors(response) {
		if (response.status !== 200 && parseInt(response.status / 100, 10) > 4) {
			const e = new ErrorAPI(response);
			e.response = response;
			e.status = response.status;
			throw e;
		}
		return response.data;
	}

	get(uri, params) {
		console.log("getApi");
		const options = {
			headers: this.headers,
			params,
		};
		return axios.get(this.url + uri, options).then(API.handleErrors);
	}

	post(uri, options) {
		return axios
			.post(this.url + uri, options.data, {
				headers: options.headers,
			})
			.then(API.handleErrors);
	}

	put(uri, options) {
		return axios
			.put(this.url + uri, options.data, {
				headers: options.headers,
			})
			.then(API.handleErrors);
	}

	delete(uri) {
		return axios.delete(this.url + uri).then(API.handleErrors);
	}

	static add(name, url) {
		API.apis[name] = new API(url);
	}

	static to(name) {
		return API.apis[name];
	}
}

export { API, ErrorAPI };
