import React, { ChangeEvent } from 'react'

import { capitalize } from '../utils'

interface textInputInterface {
  name: string,
  textarea?: boolean,
  value: string,
  onChange: (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => void
}

export default function TextInput({ name, onChange, value, textarea }: textInputInterface) {

  return (<>
    <label htmlFor={name}>{capitalize(name)}: </label>
    {textarea
      ? (<textarea id={name} name={name} value={value} onChange={onChange} />)
      : (<input type="text" id={name} name={name} value={value} onChange={onChange} />)
    }
  </>)
}
