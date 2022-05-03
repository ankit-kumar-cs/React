import { ADD_PROMOS, PROMOS_FAILED, PROMOS_LOADING } from "./actionTypes";
const PromotionReducer = (state = {
    errorMessage: null,
    isLoading: true,
    promotions: []
}, action) => {
    switch (action.type) {
        case ADD_PROMOS:
            return {
                ...state,
                isLoading: false,
                errorMessage: null,
                promotions: action.payload
            }
        case PROMOS_LOADING:
            return {
                ...state,
                isLoading: true,
                errorMessage: null,
                promotions: []
            }
        case PROMOS_FAILED:
            return {
                ...state,
                isLoading: false,
                errorMessage: action.payload,
                promotions: []
            }
        default:
            return state;
    }
}
export default PromotionReducer;