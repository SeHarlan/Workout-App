import React, { useState } from 'react'
import { workoutInterface } from '../graphQL/interfaces'
import EditWorkoutItem from './EditWorkoutItem'
import DisplayWorkoutItem from './DisplayWorkoutItem'

export default function WorkoutList({ workouts }: { workouts: workoutInterface[] }) {
  const [editID, setEditID] = useState(null)

  return (<ol>
    {workouts
      ?.sort((a, b) => (a.position - b.position))
      ?.map((workout) => {
        if (editID === workout.id) return <EditWorkoutItem key={workout.id + workout.name} workout={workout} setEditID={setEditID} />
        else return <DisplayWorkoutItem temp={workout.temp as boolean} key={workout.id + workout.name} workout={workout} editID={editID} setEditID={setEditID} />
      })
    }
  </ol>)
}