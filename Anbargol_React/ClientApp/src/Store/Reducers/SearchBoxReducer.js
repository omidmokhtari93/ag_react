import * as actions from '../Actions/SearchBoxActions';
import { updateObject } from '../Utility';

const initialState = {
    result: [],
    loading: false
}

const SearchBoxRedcuder = (state = initialState, action) => {
    switch (action.type) {
        case actions.SEARCH_GOL:
            return updateObject(state, { result: action.result, loading: false })
        case actions.SHOW_LOADING:
            return updateObject(state, { loading: true })
        case actions.HIDE_LOADING:
            return updateObject(state, { loading: false })
        case actions.CLEAR_RESULT:
            return updateObject(state, { result: [] })
    }
    return state;
}

export default SearchBoxRedcuder;