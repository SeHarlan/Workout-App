import React from 'react'

export default function WorkoutList({ workouts }) {
  return (<ul>
    {workouts
      ?.sort((a, b) => (a.position - b.position))
      ?.map(({ name, description, heavy, medium, light }) => (<li>
        <h3>{name}</h3>
        <p>{description}</p>
        <i>heavy: {heavy}</i>
        <i>medium: {medium}</i>
        <i>light: {light}</i>
      </li>))}
  </ul>)
}