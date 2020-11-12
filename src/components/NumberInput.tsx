import React, { ChangeEvent } from 'react'

import { capitalize } from '../utils'

interface numberInputInterface {
  value: number,
  name: string,
  max?: number
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

export default function NumberInput({ value, onChange, name, max }: numberInputInterface) {

  return (<>
    <label htmlFor={name}>{capitalize(name)}: </label>
    <input
      type="number"
      id={name}
      name={name}
      value={value}
      min={name === "position" ? 1 : 0}
      max={max ? max : undefined}
      onChange={onChange} />
  </>)
}