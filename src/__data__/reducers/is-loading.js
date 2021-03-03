import {LOADING_STATE} from "../action-types";

export default (state = false, action) => {

    switch (action.type) {
        case LOADING_STATE:
            return action.loading

        default:
            return state
    }
}
