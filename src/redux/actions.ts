import { fetchWorkouts } from "../graphQL/queries"
import { WorkoutDispatchType } from "./reduxInterfaces"
import { workoutFormInterface } from "../graphQL/interfaces"
import { addWorkoutGQL } from "../graphQL/workoutMutations"
import dummyData from '../graphQL/dummyData.json'

export const SET_WORKOUTS = 'SET_WORKOUTS'
export const setWorkouts = (userID: number) => (dispatch: WorkoutDispatchType) => {
  return fetchWorkouts(userID)
    .then(workouts => {
      if (workouts) {
        dispatch({
          type: SET_WORKOUTS,
          payload: workouts
        })
      }
    })
    .catch(err => {
      dispatch({
        type: SET_WORKOUTS,
        payload: [{
          ...dummyData[0],
          description: dummyData[0].description + ': ' + String(err)
        }]
      })
    })
}

export const ADD_WORKOUT = 'ADD_WORKOUT'
export const ADD_TEMP_WORKOUT = 'ADD_TEMP_WORKOUT'
export const ERR_ADDING_WORKOUT = 'ERR_ADDING_WORKOUT'
export const addWorkout = (userID: number, newWorkoutPosition: number, formWorkout: workoutFormInterface) => (dispatch: WorkoutDispatchType) => {

  dispatch({
    type: ADD_TEMP_WORKOUT,
    payload: {
      ...formWorkout,
      userID,
      id: -1
    }
  })

  return addWorkoutGQL(userID, newWorkoutPosition, formWorkout)
    .then(workout => {
      // TESTING OPTIMISTIC LOADING 
      // setTimeout(() => dispatch({
      //   type: ADD_WORKOUT,
      //   payload: workout
      // }), 3000)

      // throw Error('testing optimistic loading on error');

      dispatch({
        type: ADD_WORKOUT,
        payload: workout
      })
    })
    .catch(err => {
      dispatch({
        type: ERR_ADDING_WORKOUT,
        payload: {
          ...formWorkout,
          userID,
          id: -1,
          description: String(err)
        }
      })
    })
}