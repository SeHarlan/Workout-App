import { globalState } from './reduxInterfaces'



export const getWorkouts = (state: globalState) => state.workoutsReducer.workouts

export const getMaxWorkoutPosition = (state: globalState) => state.workoutsReducer.workouts.length + 1