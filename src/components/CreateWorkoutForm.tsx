import React, { useState, FormEvent, ChangeEvent, useEffect } from 'react'
import { addWorkoutGQL } from '../graphQL/workoutMutations'
import NumberInput from './NumberInput'
import TextInput from './TextInput'
import { useDispatch } from 'react-redux'
import { addWorkout } from '../redux/actions'

const getInitState = (newWorkoutPosition = 1) => ({
  name: '',
  description: '',
  heavy: 0,
  medium: 0,
  light: 0,
  position: newWorkoutPosition,
})

export default function CreateWorkoutForm({ newWorkoutPosition, userID }: { newWorkoutPosition: number, userID: number }) {
  const [formState, setFormState] = useState(getInitState(newWorkoutPosition))

  const dispatch = useDispatch()

  useEffect(() => {
    setFormState(prev => ({
      ...prev,
      position: newWorkoutPosition
    }))
  }, [newWorkoutPosition])


  const handleSave = async (event: FormEvent) => {
    event.preventDefault()
    if (formState.name === "") return

    dispatch(addWorkout(userID, newWorkoutPosition, formState))

    setFormState(getInitState(newWorkoutPosition));
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.currentTarget

    setFormState(prev => ({
      ...prev,
      [name]: value
    }))
  }
  return (<form onSubmit={handleSave}>
    <TextInput name="name" value={formState.name} onChange={handleChange} />
    <br />
    <TextInput name="description" value={formState.description} onChange={handleChange} textarea />
    <br />
    <NumberInput name="heavy" onChange={handleChange} value={formState.heavy} />
    <br />
    <NumberInput name="medium" onChange={handleChange} value={formState.medium} />
    <br />
    <NumberInput name="light" onChange={handleChange} value={formState.light} />
    <br />
    <NumberInput name="position" onChange={handleChange} value={formState.position} />
    <br />
    <button>Save</button>
  </form>)
}