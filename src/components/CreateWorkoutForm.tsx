import React, { useState, FormEvent, ChangeEvent, useEffect } from 'react'
import NumberInput from './NumberInput'
import TextInput from './TextInput'
import { useDispatch, useSelector } from 'react-redux'
import { addWorkout } from '../redux/actions/workoutActions'
import { getMaxWorkoutPosition } from '../redux/selectors'

const getInitState = (newWorkoutPosition = 1) => ({
  name: '',
  description: '',
  heavy: 0,
  medium: 0,
  light: 0,
  position: newWorkoutPosition,
})

export default function CreateWorkoutForm({ userID }: { userID: number }) {
  const maxLength = useSelector(getMaxWorkoutPosition)

  const [formState, setFormState] = useState(getInitState(maxLength))

  const dispatch = useDispatch()

  useEffect(() => {
    setFormState(prev => ({
      ...prev,
      position: maxLength
    }))
  }, [maxLength])


  const handleSave = async (event: FormEvent) => {
    event.preventDefault()
    if (formState.name === "") return

    dispatch(addWorkout(userID, formState))

    setFormState(getInitState(maxLength));
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
    <NumberInput name="position" onChange={handleChange} value={formState.position} max={useSelector(getMaxWorkoutPosition)} />
    <br />
    <button>Save</button>
  </form>)
}