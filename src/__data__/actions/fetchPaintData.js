import {LOAD_PAINT_DATA_SUCCESS, LOAD_PAINT_DATA_ERROR} from "../action-types";
import {changeLoadingState} from "./changeLoadingState";

export const fetchPaintDataSuccess = (data) => (
    {
        type: LOAD_PAINT_DATA_SUCCESS,
        data
    }
)

export const fetchPaintDataError = () => (
    {
        type: LOAD_PAINT_DATA_ERROR,
    }
)

export const fetchPaintData = () => {
    return (dispatch) => {
        const URL = process.env.PUBLIC_URL + '/paint/paint.json'

        dispatch(changeLoadingState(true))

        fetch(URL)
            .then((response) => {
                dispatch(changeLoadingState(false))

                return response;
            })
            .then((response) => response.json())
            .then((data) => dispatch(fetchPaintDataSuccess(data)))
            .catch(() => dispatch(fetchPaintDataError()))
    }
}
