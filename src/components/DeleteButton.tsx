import React, { useState } from 'react'
import { deleteWorkout } from '../graphQL/workoutMutations'

export default function DeleteButton({ workoutID }: { workoutID: number }) {
  const [submitBool, setSubmitBool] = useState(false)

  const handleDelete = async () => {
    setSubmitBool(true)
    const { id } = await deleteWorkout(workoutID)
    if (id === workoutID) setSubmitBool(false)
  }

  return (<button onClick={handleDelete} disabled={submitBool}>
    Delete
  </button>)
}