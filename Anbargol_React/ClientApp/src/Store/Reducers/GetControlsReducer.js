const initialState = {
    items: [],
    formats: [],
    colors: [],
    colorTypes: [],
    customers: [],
    companies: []
}

const GetControlsReducer = (state = initialState, action) => {
    return {
        ...state,
        colors: [1, 2, 3]
    };
}

export default GetControlsReducer;