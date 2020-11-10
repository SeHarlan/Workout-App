import { combineReducers } from 'redux'
import workoutsReducer from './workoutsReducer'

const combinedReducers = combineReducers({ workoutsReducer })

export default combinedReducers