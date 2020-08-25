import { combineReducers } from 'redux';
import SearchBoxRedcuder from './Reducers/SearchBoxReducer';
import AddFlowerReducer from './Reducers/AddFlowerReducer'

const RootReducer = combineReducers({
    AddNew: AddFlowerReducer,
})

//const RootReducer = AddFlowerReducer;

export default RootReducer;