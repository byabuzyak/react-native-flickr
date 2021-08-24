import {RequestResponse, SearchRequest} from "../../core/dto/Search";
import {Dispatch} from "redux";
import {SearchActions} from "./SearchActions";
import {requestsRepository} from "../../core/api/RequestsRepository";
import AsyncStorage from '@react-native-community/async-storage';

/**
 * Search async actions dispatcher
 */
export class SearchAsync {
    private static SAVE_HISTORY_KEY = 'search-history1';

    /**
     * Perform a search request and dispatch corresponding action
     * @param request
     */
    static search(request: SearchRequest) {
        return async (dispatch: Dispatch, getState: () => any): Promise<void> => {
            try {
                dispatch(SearchActions.search.started(request));
                const result: RequestResponse = await requestsRepository.imageSearch.getImages(request);
                dispatch(SearchActions.search.done({params: request, result}));
            } catch (error) {
                dispatch(SearchActions.search.failed({params: request, error}));
            }
        }
    }

    /**
     * Save search query
     * @param query
     */
    static saveQuery(query: string[]) {
        return async (dispatch: Dispatch, getState: () => any): Promise<void> => {
            await AsyncStorage.setItem(this.SAVE_HISTORY_KEY, JSON.stringify(query));
            dispatch(SearchActions.saveQuery);
        }
    }

    /**
     * Load search history
     */
    static loadQueryHistory() {
        return async (dispatch: Dispatch, getState: () => any): Promise<void> => {
            dispatch(SearchActions.loadHistory(JSON.parse(await AsyncStorage.getItem(this.SAVE_HISTORY_KEY))));
        }
    }
}
