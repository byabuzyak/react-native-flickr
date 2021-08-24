import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainScreen from "../screens/MainScreen";
import {Store} from "../modules/search/Store";
import {Provider} from "react-redux";
import {SearchScreen} from "../screens/SearchScreen";
import {Pages} from "./Pages";

const Stack = createNativeStackNavigator();

const Routes = () => {
    return (
        <Provider store={Store}>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen
                        name={Pages.mainScreen}
                        component={MainScreen}
                        options={{title: 'Flickr image search'}}
                    />
                    <Stack.Screen
                        name={Pages.searchScreen}
                        component={SearchScreen}
                        options={{title: 'Search results'}}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    );
};

export default Routes;
