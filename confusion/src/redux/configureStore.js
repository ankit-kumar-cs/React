import {createStore, combineReducers, applyMiddleware} from 'redux';
import CommentReducer from './comment.reducer';
import PromotionReducer from './promotions.reducer';
import DishReducer from './dishes.reducer';
import LeaderReducer from './leader.reducer';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { InitialFeedback } from './forms';
import { createForms } from 'react-redux-form';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            dishes: DishReducer,
            promotions: PromotionReducer,
            leaders: LeaderReducer,
            comments: CommentReducer,
            ...createForms({
                feedback: InitialFeedback
            })
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
}