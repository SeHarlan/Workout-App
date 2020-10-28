import { makeGraphQLCall } from './helpers'
import { workoutInterface } from './interfaces';

export function fetchWorkouts(userID: number) {
  console.log('fetch srtarted with id', userID)
  const query = `
    query {
      workouts(userID: ${userID}) {
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
  return makeGraphQLCall(query, 'workouts')
    .then(workouts => workouts as workoutInterface[])
}

