import Request from "./Request";
import {RequestResponse, SearchRequest} from "../dto/Search";

/**
 * Image search API class
 */
export default class ImageSearch {
    private request: Request;

    constructor() {
        this.request = new Request();
    }

    /**
     * Load images from API Flickr
     * @param request
     */
    async getImages(request: SearchRequest): Promise<RequestResponse> {
        return await this.request.get('/services/rest', request, undefined);
    }
}
