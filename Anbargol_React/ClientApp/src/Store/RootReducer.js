import { combineReducers } from 'redux';
import SearchBoxRedcuder from './Reducers/SearchBoxReducer';

// const RootReducer = combineReducers({
//     searchBox: SearchBoxReducer
// })

const RootReducer = SearchBoxRedcuder;

 export default RootReducer;