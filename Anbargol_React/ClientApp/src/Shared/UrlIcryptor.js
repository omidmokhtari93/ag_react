const url = {

    enc: (url) => {
        return window.btoa(url);
    },

    dec: (url) => {
        return window.atob(url);
    }
}

export default url;