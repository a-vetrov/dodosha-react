import {AppDispatch} from "../store";
import {changeLoadingState} from "../slices/isLoadingSlice";
import {ActionCreatorWithoutPayload, ActionCreatorWithPayload} from "@reduxjs/toolkit";

type FunctionSuccess = ActionCreatorWithPayload<any, string>
type FunctionError = ActionCreatorWithoutPayload<string>
type ResultType = (dispatch: AppDispatch) => any

export const fetchData = (url: string, loadingCompleteSuccess: FunctionSuccess, loadingCompleteError: FunctionError): ResultType => (dispatch: AppDispatch) => {

    dispatch(changeLoadingState(true))

    fetch(url)
        .then((response) => {
            dispatch(changeLoadingState(false))

            return response;
        })
        .then((response) => response.json())
        .then((data) => dispatch(loadingCompleteSuccess(data)))
        .catch(() => dispatch(loadingCompleteError()))
}
