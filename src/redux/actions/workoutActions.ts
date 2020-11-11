import { fetchWorkouts } from "../../graphQL/queries"
import { WorkoutDispatchType } from "../reduxInterfaces"
import { workoutFormInterface, workoutInterface } from "../../graphQL/interfaces"
import { addWorkoutGQL, shiftWorkoutGQL, updateWorkoutGQL } from "../../graphQL/workoutMutations"
import dummyData from '../../graphQL/dummyData.json'

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
      const [dumWorkout] = dummyData
      dispatch({
        type: SET_WORKOUTS,
        payload: [{
          ...dumWorkout,
          description: dumWorkout.description + ' ::: ' + String(err)
        }]
      })
    })
}

export const WORKOUT_ERROR = 'WORKOUT_ERROR'

export const ADD_WORKOUT = 'ADD_WORKOUT'
export const ADD_TEMP_WORKOUT = 'ADD_TEMP_WORKOUT'
export const addWorkout = (userID: number, newWorkoutPosition: number, formWorkout: workoutFormInterface) => (dispatch: WorkoutDispatchType) => {

  dispatch({
    type: ADD_TEMP_WORKOUT,
    payload: {
      ...formWorkout,
      id: -1,
      userID,
      temp: true
    }
  })
  return addWorkoutGQL(userID, newWorkoutPosition, formWorkout)
    .then(workout => {
      // TESTING OPTIMISTIC LOADING 
      // setTimeout(() => dispatch({
      //   type: ADD_WORKOUT,
      //   payload: workout
      // }), 3000)

      // throw Error('testing optimistic loading with adding error');

      dispatch({
        type: ADD_WORKOUT,
        payload: workout
      })
    })
    .catch(err => {
      dispatch({
        type: WORKOUT_ERROR,
        payload: {
          ...formWorkout,
          userID,
          id: -1,
          temp: true,
          description: 'Error Adding Workout: ' + String(err)
        }
      })
    })
}

export const EDIT_TEMP_WORKOUT = 'EDIT_TEMP_WORKOUT'
export const EDIT_WORKOUT = 'EDIT_WORKOUT'
export const editWorkout = (workout: workoutInterface, shiftBool: boolean) => async (dispatch: WorkoutDispatchType) => {

  dispatch({
    type: EDIT_TEMP_WORKOUT,
    payload: {
      ...workout,
      temp: true
    }
  })

  const { id, position } = workout
  let shiftErr = null
  if (shiftBool) {
    try {
      await shiftWorkoutGQL(id, position)
      // throw Error('testing optimistic loading with Shifting Error');
    } catch (err) {
      shiftErr = err
      dispatch({
        type: WORKOUT_ERROR,
        payload: {
          ...workout,
          temp: true,
          description: 'Error Shifting Position: ' + String(err)
        }
      })
    }
  }
  if (!shiftErr) return updateWorkoutGQL(workout)
    .then(workout => {
      // TESTING OPTIMISTIC LOADING 
      setTimeout(() => dispatch({
        type: ADD_WORKOUT,
        payload: workout
      }), 3000)
      // throw Error('testing optimistic loading with Updating Error');
      // dispatch({
      //   type: EDIT_WORKOUT,
      //   payload: workout
      // })
    })
    .catch(err => {
      dispatch({
        type: WORKOUT_ERROR,
        payload: {
          ...workout,
          temp: true,
          description: 'Error Editing Workout: ' + String(err)
        }
      })
    })
}