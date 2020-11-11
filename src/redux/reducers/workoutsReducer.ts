import { workoutInterface } from "../../graphQL/interfaces";
import { SET_WORKOUTS, ADD_WORKOUT, ADD_TEMP_WORKOUT, WORKOUT_ERROR, EDIT_TEMP_WORKOUT, EDIT_WORKOUT } from '../actions/workoutActions'
import { WorkoutState, WorkoutAction } from "../reduxInterfaces";

const initialState: WorkoutState = {
  workouts: []
}


const workoutReducer = (
  state: WorkoutState = initialState,
  action: WorkoutAction
): WorkoutState => {
  const { type, payload } = action
  const getFilteredWorkouts = () => state.workouts?.filter(workout => !workout.temp)
  const getErrorWorkouts = () => {
    const { description, name } = payload as workoutInterface
    return state.workouts?.map((workout) => {
      if (workout.name === name && workout.temp) return {
        ...workout,
        description
      };
      return workout
    })
  }

  switch (type) {
    case SET_WORKOUTS:
      return { ...state, workouts: payload as workoutInterface[] };

    case ADD_TEMP_WORKOUT:
      const workout = payload as workoutInterface
      return {
        ...state,
        workouts: (state.workouts
          ? [...state.workouts, workout]
          : [workout])
      };

    case ADD_WORKOUT:
      return { ...state, workouts: [...getFilteredWorkouts(), payload as workoutInterface] };

    case EDIT_TEMP_WORKOUT:
      const editWorkout = payload as workoutInterface
      const newWorkouts = state.workouts?.map(workout => {
        if (workout.id === editWorkout.id) return editWorkout;
        else return workout
      })
      return {
        ...state,
        workouts: newWorkouts
      };

    case EDIT_WORKOUT:
      return { ...state, workouts: [...getFilteredWorkouts(), payload as workoutInterface] };

    case WORKOUT_ERROR:
      return { ...state, workouts: getErrorWorkouts() };

    default: return state
  }
}

export default workoutReducer