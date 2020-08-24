import { combineReducers } from 'redux';
import SearchBoxRedcuder from './Reducers/SearchBoxReducer';
import GetControlsReducer from './Reducers/GetControlsReducer';


// const RootReducer = combineReducers({
//     searchBox: SearchBoxRedcuder,
//     golControls: GetControlsReducer
// })

const RootReducer = GetControlsReducer;

export default RootReducer;