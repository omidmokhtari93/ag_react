export const STORE_FLOWER_ID = "STORE_FLOWER_ID";


export const store = id => {
    return {
        type: STORE_FLOWER_ID,
        value: id
    }
}