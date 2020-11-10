import { workoutInterface } from "../graphQL/interfaces"


export interface globalState {
  workoutsReducer: WorkoutState
}

export type globalAction = WorkoutAction

export type globalDispatch = WorkoutDispatchType


//Workout Interfaces

export type WorkoutState = {
  workouts: workoutInterface[]
}

export type WorkoutAction = {
  type: string
  payload: workoutInterface[] | workoutInterface
}

export type WorkoutDispatchType = (args: WorkoutAction) => WorkoutAction

