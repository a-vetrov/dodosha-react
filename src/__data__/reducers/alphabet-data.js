import {LOAD_ALPHABET_DATA_SUCCESS, LOAD_ALPHABET_DATA_ERROR} from "../action-types";

const initialState = {loaded: false}

const alphabet = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_ALPHABET_DATA_ERROR:
            return {error: true, loaded: false}
        case LOAD_ALPHABET_DATA_SUCCESS:
            return {...action.data, loaded: true}
        default:
            return state
    }
}

export default alphabet