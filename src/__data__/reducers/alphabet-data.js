import {LOAD_ALPHABET_DATA_SUCCESS, LOAD_ALPHABET_DATA_ERROR} from "../action-types";

const initialState = {loaded: false, letters: [], words: []}

const alphabet = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_ALPHABET_DATA_ERROR:
            return {...initialState, error: true, loaded: false}
        case LOAD_ALPHABET_DATA_SUCCESS:
            return {...initialState, ...action.data, loaded: true}
        default:
            return state
    }
}

export default alphabet