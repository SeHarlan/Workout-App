import React, { useState, ChangeEvent } from 'react'
import { workoutInterface } from '../graphQL/interfaces'
import DeleteButton from './DeleteButton'
import NumberInput from './NumberInput'
import TextInput from './TextInput'


export default function EditWorkoutItem({ workout, setEditID }: { workout: workoutInterface, setEditID: Function }) {
  const [editForm, setEditForm] = useState({ ...workout })

  const handleSave = async () => {
    console.log(editForm)
    //await updateWorkout

    // if position changed
    //shiftWorkout
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.currentTarget
    setEditForm(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleDiscardChanges = () => {
    // setEditForm({ ...workout })
    setEditID(null)
  }

  return (
    <li>
      <TextInput name="name" value={editForm.name} onChange={handleChange} />
      <br />
      <TextInput name="description" value={editForm.description} onChange={handleChange} textarea />
      <br />
      <NumberInput name="heavy" onChange={handleChange} value={editForm.heavy} />
      <br />
      <NumberInput name="medium" onChange={handleChange} value={editForm.medium} />
      <br />
      <NumberInput name="light" onChange={handleChange} value={editForm.light} />
      <br />
      <NumberInput name="position" onChange={handleChange} value={editForm.position} />
      <br />

      <DeleteButton workoutID={workout.id} />
      <button onClick={handleSave}>Save</button>
      <button onClick={handleDiscardChanges}>Discard Changes</button>
    </li>
  )

}