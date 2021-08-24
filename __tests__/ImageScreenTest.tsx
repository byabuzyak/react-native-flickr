import * as React from 'react';
import {act, render, waitFor} from "@testing-library/react-native";
import {Provider} from "react-redux";
import {Store} from "../src/modules/search/Store";
import {SearchScreen} from "../src/screens/SearchScreen";
import axios from "axios";

jest.mock('axios');

describe('Image screen test', () => {
    const route = {params: jest.fn()};
    const component = (
        <Provider store={Store}>
            <SearchScreen route={route}/>
        </Provider>
    );

    test('should display empty screen', async () => {
        const {getAllByText} = await render(component);
        await waitFor(() => {
            const searchQueries = getAllByText(/Nothing/i);
            expect(searchQueries).toBeTruthy();
        });
    });

    test('should display image list', async () => {
        axios.mockResolvedValue({
            data: {
                photos: {
                    page: 1,
                    pages: 1,
                    perpage: 10,
                    photo: [
                        {
                            id: "1",
                            owner: "owner",
                            secret: "secret",
                            server: "server",
                            farm: 1,
                            title: "title",
                            ispublic: 0,
                            isfriend: 0,
                            isfamily: 0
                        }
                    ],
                    total: 1,
                    stat: 'ok',
                }
            }
        });


        const {getByTestId} = render(component);
        await waitFor(() => {
            const itemList = getByTestId('item_list');
            expect(itemList).toBeTruthy();
        });
    });
});
