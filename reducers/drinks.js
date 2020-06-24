import {
    CHECKED_DRINK,
    GET_FILTERS_DRINKS_LIST_REQUEST,
    INCREMENT_CURRENT_DRINK,
    ADD_DRINKS_LIST
} from '../actions/drinks'

const initialState = {
    filterList: null,
    checkedDrink: [],
    currentDrink: 0,
    listDrinksObj: {},
}

export const drinksReducer = (state = initialState, {type, payload}) => {
    switch (type) {

        case ADD_DRINKS_LIST: {
            return {
                ...state,
                listDrinksObj: payload
            };
        }
        case GET_FILTERS_DRINKS_LIST_REQUEST: {
            return {
                ...state,
                filterList: payload
            };
        }
        case CHECKED_DRINK: {
            return {
                ...state,
                checkedDrink: payload
            };
        }
        case INCREMENT_CURRENT_DRINK : {
            return {
                ...state,
                currentDrink: payload
            };
        }
        default:
            return state;
    }
}