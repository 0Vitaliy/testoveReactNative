import {
    getDrinks,
    getFilterList
} from '../api/configAPI';
import {store} from "../store/configureStore";

export const GET_FILTERS_DRINKS_LIST_REQUEST = 'GET_TIMER_PLANING_LIST_REQUEST';
export const GET_DRINKS_LIST_REQUEST = 'GET_DRINKS_LIST_REQUEST';
export const CHECKED_DRINK = 'CHECKED_DRINK';
export const INCREMENT_CURRENT_DRINK = 'INCREMENT_CURRENT_DRINK';
export const ADD_DRINKS_LIST = 'ADD_DRINKS_LIST';


const getFilterDrinksListRequest = payload => ({
    type: GET_FILTERS_DRINKS_LIST_REQUEST,
    payload
});

export const addDrinkList = payload => ({
    type: ADD_DRINKS_LIST,
    payload
});

const getDrinksListRequest = payload => ({
    type: GET_DRINKS_LIST_REQUEST,
    payload
});

export const checkedDrinkAction = payload => ({
    type: CHECKED_DRINK,
    payload
});

export const incrementCurrentDrinkAction = payload => ({
    type: INCREMENT_CURRENT_DRINK,
    payload
});


export const getDrinksAction = (drink) => async dispath => {
    const {currentDrink, checkedDrink, listDrinksObj} = store.getState().drinksReducer;
    try {
        const {data} = await getDrinks(drink);

        dispath(addDrinkList({...listDrinksObj, [drink]: data.drinks}))

        dispath(getDrinksListRequest(data))
        if (currentDrink <= checkedDrink.length - 1) {
            dispath(incrementCurrentDrinkAction(currentDrink + 1))
        }
    } catch (error) {
        console.log(error)
    }

}

export const getFilterDrinksAction = async dispath => {

    try {
        const {data} = await getFilterList();
        dispath(checkedDrinkAction(data.drinks))
        dispath(getFilterDrinksListRequest(data))
    } catch (error) {
        console.log(error)
    }

}