import React, { useEffect, useState } from 'react'
import WorkoutList from '../components/WorkoutList'

import dummyWorkouts from '../graphQL/dummyData.json'

export default function Workouts() {
  const [workouts, setWorkouts] = useState([])

  useEffect(() => {
    // fetchWorkouts()
    //   .then(fetchedWorkouts => {
    //     setWorkouts(fetchedWorkouts)
    //   })
    setWorkouts(dummyWorkouts)
  }, [])

  return (<main>
    <WorkoutList workouts={workouts} />
  </main>)
}