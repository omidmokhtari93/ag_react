const url = {

    enc: (url) => {
        try {
            return window.btoa(url);    
        } catch (error) {
            throw new Error(error)
        }
    },

    dec: (url) => {
        try {
            return window.atob(url);
        } catch (error) {
            throw new Error(error)
        }
        
    }
}

export default url;