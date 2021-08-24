import axios from 'axios';

const defaultOptions = {
    baseUrl: 'https://api.flickr.com',
    basePath: '',
}

const defaultParams = {
    method: 'flickr.photos.search',
    api_key: '11c40ef31e4961acf4f98c8ff4e945d7',
    format: 'json',
    nojsoncallback: 1,
    per_page: 20,
}

/**
 * Provide a layer over the HTTP library,
 * to configure request params before making a HTTP call
 */
class Request {
    private configuration: { baseUrl: string; basePath: string };

    constructor() {
        this.configuration = {...defaultOptions};
    }

    /**
     * Perform GET request
     * @param endpoint
     * @param params
     * @param data
     */
    get(endpoint: string, params, data) {
        return this.send(endpoint, 'GET', params, data);
    }

    /**
     * Send request
     * @param endpoint
     * @param method
     * @param params
     * @param data
     */
    send(endpoint, method, params, data): Promise<any> {
        let url = `${this.configuration.baseUrl}${this.configuration.basePath}${endpoint}`;

        const headers = {
            'Content-Type': 'application/json'
        };

        params = {...params, ...defaultParams};

        return new Promise((resolve, reject) => {
            axios({
                url,
                method,
                headers,
                params,
                data,
            })
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }
}

export default Request;
