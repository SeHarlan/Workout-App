import React, { useEffect, useState } from 'react'
import WorkoutList from '../components/WorkoutList'

import CreateWorkoutForm from '../components/CreateWorkoutForm'
import { setWorkouts } from '../redux/actions/workoutActions'
import { useDispatch, useSelector } from 'react-redux'
import { getWorkouts } from '../redux/selectors'


export default function Workouts() {
  const [userID, setUserID] = useState(1) //user id goes here
  const workouts = useSelector(getWorkouts)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setWorkouts(userID))
  }, [userID, dispatch])


  return (<main>
    <CreateWorkoutForm userID={userID} />
    <WorkoutList workouts={workouts} />
  </main>)
}