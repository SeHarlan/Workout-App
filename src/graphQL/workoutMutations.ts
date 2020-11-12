import { makeGraphQLCall } from './helpers'
import { workoutInterface, workoutFormInterface } from './interfaces';

export function deleteWorkoutGQL(workoutID: number) {
  const query = `
      mutation {
        deleteWorkout(id: ${workoutID}) {
          id
          userID
          name
          description
          heavy
          medium
          light
          position
        }
      }`;
  return makeGraphQLCall(query, 'deleteWorkout')
    .then(workout => workout as workoutInterface)
}

export function addWorkoutGQL(userID: number, {
  name,
  description,
  heavy,
  medium,
  light,
  position
}: workoutFormInterface) {

  const query = `
      mutation {
        addWorkout(userID: ${userID}, name: "${name}", description: "${description}", heavy: ${heavy}, medium: ${medium}, light: ${light}, position: ${position}) {
          id
          userID
          name
          description
          heavy
          medium
          light
          position
        }
      }`;
  return makeGraphQLCall(query, 'addWorkout')
    .then(workout => workout as workoutInterface)
}

export function updateWorkoutGQL({
  id,
  name,
  description,
  heavy,
  medium,
  light
}: workoutInterface) {
  const query = `
    mutation {
      updateWorkout(id: ${id}, name: "${name}", description: "${description}", heavy: ${heavy}, medium: ${medium}, light: ${light}) {
        id
        userID
        name
        description
        heavy
        medium
        light
        position
      }
    }`;
  return makeGraphQLCall(query, 'updateWorkout')
    .then(workout => workout as workoutInterface)
}

export function shiftWorkoutGQL(
  workoutID: number,
  newPosition: number
) {
  const query = `
      mutation {
        shiftWorkout(workoutID: ${workoutID}, newPosition: ${newPosition}) {
          id
          userID
          name
          description
          heavy
          medium
          light
          position
        }
      }`;
  return makeGraphQLCall(query, 'shiftWorkout')
    .then(workouts => workouts as workoutInterface[])
}