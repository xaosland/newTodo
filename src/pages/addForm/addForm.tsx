import React, { useState } from 'react'

import AddBoxIcon from '@mui/icons-material/AddBox'
import { Button, IconButton, TextField } from '@mui/material'

import s from './addForm.module.css'

type AddFormProps = {
  disabled: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  onClick: () => void
  onSubmit: (newTask: any) => void
  value: string
}

export const AddForm = ({ disabled, onChange, onClick, onSubmit, value }: AddFormProps) => {
  const [formState, setFormState] = useState({
    status: 'active',
    title: '',
  })
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.value.trim()

    if (value !== '') {
      setFormState(prevState => ({
        ...prevState,
        [e.target.name]: value,
      }))
      setError('')
    } else {
      setError('Value is empty')
    }
    onChange(e)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!formState.title.trim()) {
      setError('Title cannot be empty')

      return
    }
    const newTask = {
      id: Date.now(),
      status: formState.status,
      title: formState.title,
    }

    onSubmit(newTask)
    setFormState({
      status: 'active',
      title: '',
    })
  }

  return (
    <div className={s.add_form}>
      <form className={s.form} onSubmit={handleSubmit}>
        <TextField
          error={!!error}
          fullWidth
          label={'New Task'}
          name={'title'}
          onChange={handleChange}
          value={value}
          variant={'outlined'}
        />
        &nbsp;
        <Button color={'primary'} disabled={disabled} onClick={onClick} type={'submit'}>
          <AddBoxIcon />
        </Button>
      </form>
    </div>
  )
}
