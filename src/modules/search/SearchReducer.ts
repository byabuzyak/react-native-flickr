import {AppState} from "../../core/dto/AppState";
import {SearchActions} from "./SearchActions";
import {reducerWithInitialState} from "typescript-fsa-reducers";
import {RequestResponse, SearchRequest, SearchResponse} from "../../core/dto/Search";
import {newState} from "../../core/newState";
import {Failure, Success} from "typescript-fsa";
import {ImageItem} from "../../core/dto/ImageItem";

const initialState: AppState = {
    query: '',
    data: null,
    loading: false,
    error: null,
    searchHistory: []
};

/**
 * Fires when search started
 * @param state
 */
function searchStarted(state: AppState): AppState {
    return newState(state, {error: null, loading: true});
}

/**
 * Fires when search is done
 * @param state
 * @param payload
 */
function searchDone(state: AppState, payload: Success<SearchRequest, RequestResponse>): AppState {
    const currentData = state.data ? state.data.photo : [];
    const newList: SearchResponse = {...payload.result.photos};

    if (payload.result.photos.page && payload.result.photos.page > 1) {
        const presentKeys: Set<string> = new Set(currentData.map(((e: ImageItem): string => e.id)));
        const addedResults: ImageItem[] = [];

        for (const item of newList.photo) {
            if (!presentKeys.has(item.id)) {
                addedResults.push(item);
            }
        }

        newList.photo = currentData.concat(addedResults);
    }

    return newState(state, {loading: false, data: newList});
}

/**
 * Fires when something went wrong
 * @param state
 * @param failed
 */
function searchLoadingFailed(state: AppState, failed: Failure<SearchRequest, Error>): AppState {
    return newState(state, {error: failed.error.message, loading: false});
}

/**
 * Fires when query search saved
 * @param state
 * @param payload
 */
function saveQuery(state, payload) {
    return newState(state, {searchHistory: payload});
}

/**
 * Fires when search history loaded
 * @param state
 * @param payload
 */
function loadHistory(state, payload) {
    return newState(state, {searchHistory: payload});
}

export const SearchReducer = reducerWithInitialState(initialState)
    .case(SearchActions.search.started, searchStarted)
    .case(SearchActions.search.done, searchDone)
    .case(SearchActions.search.failed, searchLoadingFailed)
    .case(SearchActions.saveQuery, saveQuery)
    .case(SearchActions.loadHistory, loadHistory);
