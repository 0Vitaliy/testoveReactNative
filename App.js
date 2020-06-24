import React, {Component} from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {Provider} from 'react-redux';

import {FiltersScreen} from "./screens/FiltersScreen";
import {DrinksScreen} from "./screens/DrinksScreen";

import {store} from "./store/configureStore";


const AppNavigator = createStackNavigator({
    Drinks: {
        screen: DrinksScreen,
    },
    Filters: {
        screen: FiltersScreen
    },
});


const AppContainer = createAppContainer(AppNavigator);

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <AppContainer/>
            </Provider>
        )
    }
}