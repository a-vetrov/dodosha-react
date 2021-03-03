import {LOADING_STATE} from "../action-types";

export const changeLoadingState = (loading) => ({
    type: LOADING_STATE,
    loading
})