import React from 'react'
import { workoutInterface } from '../graphQL/interfaces'

export default function DisplayWorkoutItem({
  workout,
  editID,
  setEditID,
  temp }:
  {
    workout: workoutInterface,
    editID: number | null,
    setEditID: Function,
    temp: boolean
  }) {
  const { name, description, heavy, medium, light, id } = workout
  return (
    <li className={`${temp && 'temporary'}`}>
      <h3>{name}</h3>
      <p>{description}</p>
      <i>heavy: {heavy}</i>
      <i>medium: {medium}</i>
      <i>light: {light}</i>
      <button onClick={() => setEditID(id)} disabled={!!editID || temp}>Edit</button>
    </li>)
}