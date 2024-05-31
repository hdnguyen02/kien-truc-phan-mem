import {combineReducers, createStore} from 'redux'
import InfoGroupReducer from './reducers/InfoGroupReducer';
import CommentReducer from './reducers/CommentReducer';

const rootReducer = combineReducers({
    InfoGroupReducer,
    CommentReducer
});

const store = createStore(rootReducer);

export default store;