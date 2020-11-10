import { workoutInterface } from "../../graphQL/interfaces";
import { SET_WORKOUTS, ADD_WORKOUT, ADD_TEMP_WORKOUT, ERR_ADDING_WORKOUT } from '../actions'
import { WorkoutState, WorkoutAction } from "../reduxInterfaces";

const initialState: WorkoutState = {
  workouts: []
}

const workoutReducer = (
  state: WorkoutState = initialState,
  action: WorkoutAction
): WorkoutState => {
  const { type, payload } = action

  switch (type) {
    case SET_WORKOUTS:
      return { ...state, workouts: payload as workoutInterface[] }

    case ADD_TEMP_WORKOUT:
      const workout = payload as workoutInterface
      return {
        ...state,
        workouts: (state.workouts
          ? [...state.workouts, workout]
          : [workout])
      }

    case ADD_WORKOUT:
      const filteredWorkouts = state.workouts?.filter(workout => workout.id !== -1)
      return { ...state, workouts: [...filteredWorkouts, payload as workoutInterface] }

    case ERR_ADDING_WORKOUT:
      const { description, name } = payload as workoutInterface
      const mappedWorkouts = state.workouts?.map((workout) => {
        if (workout.name === name) return {
          ...workout,
          description
        }
        return workout
      })
      return { ...state, workouts: mappedWorkouts }

    default: return state
  }
}

export default workoutReducer