import * as DISH from './actionTypes';
const DishReducer = (state = {
    isLoading: true,
    errorMessage: null,
    dishes: []
}, action) => {
    switch (action.type) {
        case DISH.ADD_DISHES:
            return {
                ...state,
                errorMessage: null,
                isLoading: false,
                dishes: action.payload
            };
        case DISH.DISHES_LOADING:
            return {
                    ...state,
                    errorMessage: null,
                    isLoading: true,
                    dishes: []
            };
        case DISH.DISHES_FAILED:
                return {
                        ...state,
                        errorMessage: action.payload,
                        isLoading: false,
                        dishes: []
                };
        default:
            return state;
    }
}
export default DishReducer;