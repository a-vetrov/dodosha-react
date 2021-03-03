import {LOADING_STATE} from "../action-types";

const isLoading = (state = false, action) => {
    switch (action.type) {
        case LOADING_STATE:
            return action.loading

        default:
            return state
    }
}

export default isLoading