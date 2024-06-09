import { ReactNode } from 'react'

import './modal.css'

type ModalType = {
  active: boolean
  children: ReactNode
  setActive: (value: boolean) => void
}
export const Modal = ({ active, children, setActive, ...rest }: ModalType) => {
  return (
    <div
      className={active ? 'modal active' : 'modal'}
      onClick={() => {
        setActive(false)
      }}
      {...rest}
    >
      <div
        className={active ? 'modal_content active' : 'modal_content'}
        onClick={e => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  )
}
