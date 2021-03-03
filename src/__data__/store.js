import { createStore, combineReducers, applyMiddleware, } from 'redux'
import thunkMiddleware from 'redux-thunk'

import * as appReducers from './reducers'

const reducer = combineReducers({
    ...appReducers
})

export const store = createStore(reducer, applyMiddleware(thunkMiddleware))
