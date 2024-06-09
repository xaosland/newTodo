import React, { ChangeEvent, useState } from 'react'

import { TextField } from '@mui/material'

import s from './editForm.module.css'
type EditableSpanPropsType = {
  onChange: (taskId: string, newValue: string) => void
  taskId: string
  value: string
}

export const EditableSpan = React.memo(function (props: EditableSpanPropsType) {
  const [editMode, setEditMode] = useState(false)
  const [title, setTitle] = useState(props.value)

  const activateEditMode = () => {
    setEditMode(true)
    setTitle(props.value)
  }
  const activateViewMode = () => {
    setEditMode(false)
    props.onChange(props.taskId, title)
  }
  const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }

  return editMode ? (
    <TextField
      autoFocus
      label={'Edit Task'}
      multiline
      onBlur={activateViewMode}
      onChange={changeTitle}
      rows={2}
      sx={{ width: '90%' }}
      value={title}
    />
  ) : (
    <span className={s.span} onDoubleClick={activateEditMode}>
      {props.value}
    </span>
  )
})
