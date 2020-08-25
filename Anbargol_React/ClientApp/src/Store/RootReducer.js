import { combineReducers } from 'redux';
import SearchBoxRedcuder from './Reducers/SearchBoxReducer';
import StoreFlowerIdReducer from './Reducers/StoreFlowerIdReducer'

const RootReducer = combineReducers({
    storeFlowerId: StoreFlowerIdReducer,
})

//const RootReducer = AddFlowerReducer;

export default RootReducer;