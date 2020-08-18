export const SEARCH_GOL = "SEARCH_GOL";
export const SHOW_LOADING = "SHOW_LOADING";
export const HIDE_LOADING = "HIDE_LOADING";
export const CLEAR_RESULT = "CLEAR_RESULT";

export const searchGolResult = (res) => {
    return {
        type: SEARCH_GOL,
        result: res
    }
}
export const apiSearchGol = (key, url) => {
    return dispatch => {
        fetch(url + '?name=' + key + '&code= ' + key)
            .then(response => response.json())
            .then(json => dispatch(searchGolResult(json)))
    }
}

export const clearResult = e => {
    return {
        type: CLEAR_RESULT
    }
}

export const showLoading = e => {
    return {
        type: SHOW_LOADING
    }
}

export const hideLoading = e => {
    return {
        type: HIDE_LOADING
    }
}