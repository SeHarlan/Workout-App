import { fetchWorkouts } from "../../graphQL/queries"
import { WorkoutDispatchType } from "../reduxInterfaces"
import { workoutFormInterface, workoutInterface } from "../../graphQL/interfaces"
import { addWorkoutGQL, shiftWorkoutGQL, updateWorkoutGQL, deleteWorkoutGQL } from "../../graphQL/workoutMutations"
import dummyData from '../../graphQL/dummyData.json'

export const SET_WORKOUTS = 'SET_WORKOUTS'
export const setWorkouts = (userID: number) => (dispatch: WorkoutDispatchType) => {
  return fetchWorkouts(userID)
    .then(workouts => {
      if (workouts.length) {
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
          temp: true,
          errMessgae: 'Error Getting Workouts: ' + String(err)
        }]
      })
    })
}

export const WORKOUT_ERROR = 'WORKOUT_ERROR'

export const ADD_WORKOUT = 'ADD_WORKOUT'
export const TEMP_ADD_WORKOUT = 'TEMP_ADD_WORKOUT'
export const addWorkout = (userID: number, formWorkout: workoutFormInterface) => (dispatch: WorkoutDispatchType) => {

  dispatch({
    type: TEMP_ADD_WORKOUT,
    payload: {
      ...formWorkout,
      id: -1,
      userID,
      temp: true
    }
  })
  return addWorkoutGQL(userID, formWorkout)
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
          errMessgae: 'Error Adding Workout: ' + String(err)
        }
      })
    })
}

export const TEMP_EDIT_WORKOUT = 'TEMP_EDIT_WORKOUT'
export const EDIT_WORKOUT = 'EDIT_WORKOUT'
export const editWorkout = (workout: workoutInterface, shiftBool: boolean) => async (dispatch: WorkoutDispatchType) => {

  dispatch({
    type: TEMP_EDIT_WORKOUT,
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
          errMessgae: 'Error Shifting Position: ' + String(err)
        }
      })
    }
  }
  if (!shiftErr) return updateWorkoutGQL(workout)
    .then(workout => {
      // TESTING OPTIMISTIC LOADING 
      // setTimeout(() => dispatch({
      //   type: ADD_WORKOUT,
      //   payload: workout
      // }), 3000)
      // throw Error('testing optimistic loading with Updating Error');
      if (shiftBool) {
        return fetchWorkouts(workout.userID)
          .then(workouts => {
            dispatch({
              type: SET_WORKOUTS,
              payload: workouts
            })
          })
      } else {
        dispatch({
          type: EDIT_WORKOUT,
          payload: workout
        })
      }
    })
    .catch(err => {
      dispatch({
        type: WORKOUT_ERROR,
        payload: {
          ...workout,
          temp: true,
          errMessgae: 'Error Editing Workout: ' + String(err)
        }
      })
    })
}

export const TEMP_DELETE_WORKOUT = 'TEMP_DELETE_WORKOUT'
export const deleteWorkout = (workout: workoutInterface) => (dispatch: WorkoutDispatchType) => {
  dispatch({
    type: TEMP_DELETE_WORKOUT,
    payload: workout
  })

  return deleteWorkoutGQL(workout.id)
    .catch(err => {
      dispatch({
        type: WORKOUT_ERROR,
        payload: {
          ...workout,
          id: -1,
          temp: true,
          errMessgae: 'Error Deleleting ' + workout.name + ': ' + String(err)
        }
      })
    })


}