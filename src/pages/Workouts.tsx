import React, { useEffect, useState } from 'react'
import WorkoutList from '../components/WorkoutList'

// import dummyWorkouts from '../graphQL/dummyData.json'
import { workoutInterface } from '../graphQL/interfaces'
import { fetchWorkouts } from '../graphQL/queries'
import CreateWorkoutForm from '../components/CreateWorkoutForm'

const initialState: workoutInterface[] = []

export default function Workouts() {
  const [workouts, setWorkouts] = useState(initialState)
  const [userID, setUserID] = useState(1) //user id goes here

  useEffect(() => {
    fetchWorkouts(userID)
      .then((fetchedWorkouts) => {
        setWorkouts(fetchedWorkouts)
      })
      .catch(err => console.log(err))
  }, [userID])

  return (<main>
    <CreateWorkoutForm newWorkoutPosition={workouts.length + 1} userID={userID} />
    <WorkoutList workouts={workouts} />
  </main>)
}