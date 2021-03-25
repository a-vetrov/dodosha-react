import {LOAD_ALPHABET_DATA_ERROR, LOAD_ALPHABET_DATA_SUCCESS} from "../action-types";
import {changeLoadingState} from "./changeLoadingState";

export const fetchAlphabetDataSuccess = (data) => (
    {
        type: LOAD_ALPHABET_DATA_SUCCESS,
        data
    }
)

export const fetchAlphabetDataError = () => (
    {
        type: LOAD_ALPHABET_DATA_ERROR,
    }
)

export const fetchAlphabetData = () => {
    return (dispatch) => {
        const URL = process.env.PUBLIC_URL + '/alphabet/alphabet.json'

        dispatch(changeLoadingState(true))

        fetch(URL)
            .then((response) => {
                dispatch(changeLoadingState(false))

                return response;
            })
            .then((response) => response.json())
            .then((data) => dispatch(fetchAlphabetDataSuccess(data)))
            .catch(() => dispatch(fetchAlphabetDataError()))
    }
}