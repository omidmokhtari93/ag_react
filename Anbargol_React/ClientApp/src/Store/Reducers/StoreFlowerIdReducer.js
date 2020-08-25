import * as actions from '../Actions/StoreFlowerIdActions';

const initialState = {
    flower_id: 0
}

const StoreFlowerIdReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.STORE_FLOWER_ID:
            return {
                flower_id: action.value
            }
        default:
            return state;
    }
}

export default StoreFlowerIdReducer;