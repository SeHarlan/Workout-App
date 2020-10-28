import React, { ChangeEvent } from 'react'

import { capitalize } from '../utils'

interface numberInputInterface {
  value: number,
  name: string,
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

export default function NumberInput({ value, onChange, name }: numberInputInterface) {
  return (<>
    <label htmlFor={name}>{capitalize(name)}: </label>
    <input type="number" id={name} name={name} value={value} min={0} onChange={onChange} />
  </>)
}