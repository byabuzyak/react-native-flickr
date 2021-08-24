import ImageSearch from "./ImageSearch";

/**
 * Request repository class
 */
class RequestsRepository {
    imageSearch = new ImageSearch();
}

export const requestsRepository = new RequestsRepository();
