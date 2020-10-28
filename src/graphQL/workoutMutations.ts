import { makeGraphQLCall } from './helpers'
import { workoutInterface, workoutFormInterface, shiftInputInterface } from './interfaces';

export function deleteWorkout(workoutID: number) {
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

export function addWorkout(userID: number, newWorkoutPosition: number, {
  name,
  description,
  heavy,
  medium,
  light,
  position
}: workoutFormInterface) {

  if (position >= newWorkoutPosition) {
    position = newWorkoutPosition
  }

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

export function updateWorkout({
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

export function shiftWorkout({
  workoutID,
  newPosition
}: shiftInputInterface) {
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