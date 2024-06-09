import * as React from 'react'
import { useState } from 'react'

import { EditableSpan } from '@/pages/editForm/editForm'
import { Deck } from '@/services/types/task.type'
import DeleteIcon from '@mui/icons-material/Delete'
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered'
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck'
import TaskAltIcon from '@mui/icons-material/TaskAlt'
import Box from '@mui/material/Box'
import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton/IconButton'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import Typography from '@mui/material/Typography'

interface TabPanelProps {
  children?: React.ReactNode
  dir?: string
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, index, value, ...other } = props

  return (
    <Typography
      aria-labelledby={`action-tab-${index}`}
      component={'div'}
      hidden={value !== index}
      id={`action-tabpanel-${index}`}
      role={'tabpanel'}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </Typography>
  )
}

function a11yProps(index: any) {
  return {
    'aria-controls': `action-tabpanel-${index}`,
    id: `action-tab-${index}`,
  }
}

type TableProps = {
  data: Deck[] | undefined
  onDeleteClick: (id: string) => void
  onEditClick: (id: string, newValue: string) => void
}
export const TableTodos = ({ data, onDeleteClick, onEditClick, ...rest }: TableProps) => {
  const [value, setValue] = useState(0)

  const handleChange = (event: unknown, newValue: number) => {
    setValue(newValue)
  }
  const [taskStatus, setTaskStatus] = useState<Record<string, boolean>>({})
  const handleTaskCheckboxChange = (taskId: string, isChecked: boolean) => {
    setTaskStatus(prevState => ({
      ...prevState,
      [taskId]: isChecked,
    }))
  }

  return (
    <>
      <TabPanel index={0} value={value}>
        <Box
          sx={{
            height: '400px',
            overflowY: 'scroll',
          }}
        >
          {data?.map((task, index) => (
            <div key={index}>
              <Checkbox
                checked={taskStatus[task.id] || false}
                onChange={event => handleTaskCheckboxChange(task.id, event.target.checked)}
              />
              <EditableSpan
                onChange={(taskId, newValue) => onEditClick(taskId, newValue)}
                taskId={task.id}
                value={task.name}
              />
              <IconButton
                aria-label={'delete'}
                onClick={() => {
                  onDeleteClick(task.id)
                }}
              >
                <DeleteIcon />
              </IconButton>
            </div>
          ))}
        </Box>
      </TabPanel>

      <TabPanel index={1} value={value}>
        <Box
          sx={{
            height: '400px',
            overflowY: 'scroll',
          }}
        >
          {data
            ?.filter(task => !taskStatus[task.id])
            .map((task, index) => (
              <div key={index}>
                <Checkbox
                  checked={taskStatus[task.id] || false}
                  onChange={event => handleTaskCheckboxChange(task.id, event.target.checked)}
                />
                <EditableSpan
                  onChange={(taskId, newValue) => onEditClick(taskId, newValue)}
                  taskId={task.id}
                  value={task.name}
                />
                <IconButton
                  aria-label={'delete'}
                  onClick={() => {
                    onDeleteClick(task.id)
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </div>
            ))}
        </Box>
      </TabPanel>
      <TabPanel index={2} value={value}>
        <Box
          sx={{
            height: '400px',
            overflowY: 'scroll',
          }}
        >
          {data
            ?.filter(task => taskStatus[task.id])
            .map((task, index) => (
              <div key={index}>
                <Checkbox
                  checked={taskStatus[task.id] || false}
                  onChange={event => handleTaskCheckboxChange(task.id, event.target.checked)}
                />
                <EditableSpan
                  onChange={(taskId, newValue) => onEditClick(taskId, newValue)}
                  taskId={task.id}
                  value={task.name}
                />
                <IconButton
                  aria-label={'delete'}
                  onClick={() => {
                    onDeleteClick(task.id)
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </div>
            ))}
        </Box>
      </TabPanel>

      <Tabs
        aria-label={'action tabs example'}
        indicatorColor={'primary'}
        onChange={handleChange}
        scrollButtons
        textColor={'primary'}
        value={value}
        variant={'fullWidth'}
      >
        <Tab label={'All Tasks'} {...a11yProps(0)} icon={<TaskAltIcon />} iconPosition={'start'} />
        <Tab
          label={'Active Tasks'}
          {...a11yProps(1)}
          icon={<FormatListNumberedIcon />}
          iconPosition={'start'}
        />
        <Tab
          label={'Done Tasks'}
          {...a11yProps(2)}
          icon={<PlaylistAddCheckIcon />}
          iconPosition={'start'}
        />
      </Tabs>
    </>
  )
}
