export interface workoutInterface {
  id: number,
  userID: number,
  name: string,
  description: string,
  heavy: number,
  medium: number,
  light: number,
  position: number
}

export interface workoutFormInterface {
  name: string,
  description: string,
  heavy: number,
  medium: number,
  light: number,
  position: number
}

export interface graphqlResponseInterface {
  data: {
    workouts: workoutInterface[],
    shiftWorkout: workoutInterface[],
    addWorkout: workoutInterface,
    deleteWorkout: workoutInterface,
    updateWorkout: workoutInterface,
  }
}

export interface shiftInputInterface {
  workoutID: number,
  newPosition: number
}