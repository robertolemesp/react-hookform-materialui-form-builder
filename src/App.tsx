
import React, { type FC } from 'react'
import type { IFormField } from './shared/components/form/field'

import CustomForm from './shared/components/form'

import './App.scss'

const App: FC = (): JSX.Element => {
  const formFields: IFormField[] = [
    {
      type: 'text',
      name: 'textField',
      label: 'Text'
    },
    {
      type: 'number',
      name: 'numberField',
      label: 'Number'
    },
    {
      type: 'password',
      name: 'passwordField',
      label: 'Password'
    },
    {
      type: 'date',
      name: 'dateField',
      label: 'Date'
    },
    {
      type: 'checkbox',
      name: 'checkboxField',
      label: 'Checkbox'
    },
    {
      type: 'radioGroup',
      name: 'radioField',
      label: 'Radio',
      options: [
        { label: 'Option One', value: 1 },
        { label: 'Option Two', value: 2 }
      ]
    },
    {
      type: 'select',
      name: 'selectField',
      label: 'Select',
      rules: { required: true },
      options: [
        { label: 'Option One', value: 1 },
        { label: 'Option Two', value: 2 }
      ]
    },
    {
      type: 'element',
      element: <b>Custom Element</b>
    },
    {
      name: 'submit',
      type: 'submit',
      label: 'SUBMIT FIELD'
    }
  ]

  const rowFormFields: IFormField[][] = [
    [
      {
        type: 'text',
        name: 'textField',
        label: 'Text One'
      },
      {
        type: 'text',
        name: 'secondTextField',
        label: 'Text Two'
      },
      {
        type: 'text',
        name: 'thirdTextField',
        label: 'Text Three'
      },
    ],
    [
      {
        type: 'number',
        name: 'numberField',
        label: 'Number One'
      },
      {
        type: 'number',
        name: 'secondNumberField',
        label: 'Number Two'
      },
      {
        type: 'number',
        name: 'thirdNumberField',
        label: 'Number Three'
      }
    ],
    [
      {
        name: 'submit',
        type: 'submit',
        label: 'SUBMIT FIELD'
      }
    ]
  ]


  const handleFormSubmit = async (data: any) => {
    alert(`Submited with value: ${JSON.stringify(data, null, 2)}`)
    console.log(data)
  }

  return <main>
    <h1>Form</h1>
    <CustomForm
      fields={formFields}
      onSubmit={handleFormSubmit}
      style={{ height: '100%', width: '100%' }}
    />
    <h1>Form with Row</h1>
    <CustomForm
      fields={rowFormFields}
      onSubmit={handleFormSubmit}
      style={{ height: '100%', width: '100%' }}
    />
  </main>
}

export default App
