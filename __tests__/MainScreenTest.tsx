import * as React from 'react';
import {Provider} from "react-redux";
import {Store} from "../src/modules/search/Store";
import {act, fireEvent, render} from '@testing-library/react-native';
import MainScreen from "../src/screens/MainScreen";
import {AppState} from "../src/core/dto/AppState";

describe('Main component test', () => {
    test('Save search history on GO pressed', async () => {
        const promise = Promise.resolve()
        jest.fn(() => promise);
        const navigation = {navigate: jest.fn()};

        const component = (
            <Provider store={Store}>
                <MainScreen navigation={navigation}/>
            </Provider>
        );

        const {getByTestId} = render(component);
        const input = getByTestId('search_field');
        expect(input).toBeTruthy();

        const textToEnter = 'cat';
        fireEvent.changeText(input, textToEnter);
        fireEvent.press(getByTestId('do_search'));

        const searchHistory = Store.getState().apiReducer.searchHistory;
        expect(searchHistory.length).toEqual(1);

        await act(() => promise);
    });

    test('it should have search history', async () => {
        const promise = Promise.resolve()
        jest.fn(() => promise);

        const initState: AppState = {
            data: undefined,
            error: undefined,
            loading: false,
            query: undefined,
            searchHistory: ["one query", "two query", "three query"]
        };

        Store.getState().apiReducer = initState;

        const component = (
            <Provider store={Store}>
                <MainScreen/>
            </Provider>
        );

        const {getAllByText} = render(component);
        const searchQueries = getAllByText(/query/i);

        expect(searchQueries.length).toEqual(3);

        await act(() => promise);
    });
});
