import {ActionCreator} from "../../core/ActionCreator";
import {RequestResponse, SearchRequest} from "../../core/dto/Search";

export class SearchActions {
    static search = ActionCreator.async<SearchRequest, RequestResponse>('SEARCH');
    static saveQuery = ActionCreator<string[]>('SAVE_QUERY');
    static loadHistory = ActionCreator<string[]>('LOAD_HISTORY');
}
