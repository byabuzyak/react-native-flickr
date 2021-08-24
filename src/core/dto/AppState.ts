import {SearchResponse} from "./Search";

/**
 * App state interface
 */
export interface AppState {
    query: string | null;
    loading: boolean,
    data: SearchResponse | null,
    error: string | null;
    searchHistory: string[];
}
