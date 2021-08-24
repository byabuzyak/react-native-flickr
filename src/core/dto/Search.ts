import {ImageItem} from "./ImageItem";

/**
 * Interface to perform request
 */
export interface SearchRequest {
    page: number;
    text: string;
}

/**
 * Data response interface
 */
export interface SearchResponse {
    page: number;
    pages: number;
    perpage: number;
    photo: ImageItem[];
    total: number;
    stat: string;
}

/**
 * Request response interface
 */
export interface RequestResponse {
    photos: SearchResponse;
}
