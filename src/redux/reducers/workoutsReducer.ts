import { workoutInterface } from "../../graphQL/interfaces";
import { SET_WORKOUTS, ADD_WORKOUT, TEMP_ADD_WORKOUT, WORKOUT_ERROR, TEMP_EDIT_WORKOUT, EDIT_WORKOUT, TEMP_DELETE_WORKOUT } from '../actions/workoutActions'
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
    const { errMessgae, id } = payload as workoutInterface

    const errorWorkouts = (id === -1) ? [...state.workouts, payload as workoutInterface] : state.workouts

    return errorWorkouts?.map((workout) => {
      if (workout.id === id && workout.temp) return {
        ...workout,
        errMessgae
      };
      return workout
    })
  }

  switch (type) {
    case SET_WORKOUTS:
      return { ...state, workouts: payload as workoutInterface[] };

    case TEMP_ADD_WORKOUT:
      const addWorkout = payload as workoutInterface
      return {
        ...state,
        workouts: (state.workouts
          ? [...state.workouts, addWorkout]
          : [addWorkout])
      };

    case ADD_WORKOUT:
      return { ...state, workouts: [...getFilteredWorkouts(), payload as workoutInterface] };

    case TEMP_EDIT_WORKOUT:
      const tempEditWorkout = payload as workoutInterface
      const tempEditWorkouts = state.workouts?.map(workout => {
        if (workout.id === tempEditWorkout.id) return tempEditWorkout;
        else return workout
      })
      return {
        ...state,
        workouts: tempEditWorkouts
      };

    case EDIT_WORKOUT:
      const editWorkout = payload as workoutInterface
      return { ...state, workouts: [...getFilteredWorkouts(), editWorkout] };

    case WORKOUT_ERROR:
      return { ...state, workouts: getErrorWorkouts() };

    case TEMP_DELETE_WORKOUT:
      const tempDeleteWorkout = payload as workoutInterface
      const tempDeleteWorkouts = state.workouts.filter(workout => (workout.id !== tempDeleteWorkout.id))
      return { ...state, workouts: tempDeleteWorkouts }

    default: return state
  }
}

export default workoutReducer