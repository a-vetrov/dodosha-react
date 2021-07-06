import {LOAD_PAINT_DATA_SUCCESS, LOAD_PAINT_DATA_ERROR} from "../action-types";

const initialState = {loaded: false, categories: []}

const paint = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_PAINT_DATA_ERROR:
            return {...initialState, error: true, loaded: false}
        case LOAD_PAINT_DATA_SUCCESS:
            return {...initialState, ...action.data, loaded: true}
        default:
            return state
    }
}

export default paint
