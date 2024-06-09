import { useState } from 'react'

import { Modal } from '@/components/modal/modal'
import { Page } from '@/components/page/page'
import { AddForm } from '@/pages/addForm/addForm'
import { Info } from '@/pages/info/info'
import { TableTodos } from '@/pages/table/tableTodos'
import {
  useCreateDecksMutation,
  useDelDecksMutation,
  useGetDecksQuery,
  useUpdateDecksMutation,
} from '@/services/taskApi/taskApi.services'
import TaskIcon from '@mui/icons-material/Task'
import { CircularProgress, LinearProgress } from '@mui/material'

export const App = () => {
  const changeTheme = () => {
    document.body.classList.toggle('dark')
  }
  const { data, error, isLoading } = useGetDecksQuery({
    authorId: 'f2be95b9-4d07-4751-a775-bd612fc9553a',
  })
  const [createDeck, { isLoading: isCreating }] = useCreateDecksMutation()
  const [updateDeck] = useUpdateDecksMutation()
  const [deleteDeck] = useDelDecksMutation()
  const [name, setName] = useState('')
  const handleSubmit = () => {
    if (!name.trim()) {
      return
    }
    createDeck({ name })
    setName('')
  }

  const handleCreateDeck = (newTask: string) => {
    createDeck({ name: newTask })
  }

  const [activeModal, setActiveModal] = useState(true)

  return (
    <>
      <Page>
        <h1 onClick={changeTheme}>
          TODOS <TaskIcon />
        </h1>
        <div className={'task'}>Всего задач: {data?.items.length}</div>
        <Modal active={activeModal} setActive={setActiveModal}>
          <Info />
        </Modal>
        <AddForm
          disabled={isCreating}
          onChange={e => setName(e.target.value)}
          onClick={handleSubmit}
          onSubmit={handleCreateDeck}
          value={name}
        />
        {isLoading && <CircularProgress />}
        {isLoading && <LinearProgress />}
        {error && <p>{JSON.stringify(error)}</p>}
        <TableTodos
          data={data?.items}
          onDeleteClick={id => {
            deleteDeck({ id })
          }}
          onEditClick={(id, newValue) => {
            updateDeck({ id, name: newValue })
          }}
        />
      </Page>
    </>
  )
}
