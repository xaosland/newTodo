import { ReactNode } from 'react'

import s from './page.module.css'

type PageType = {
  children: ReactNode
}
export const Page = ({ children }: PageType) => {
  return (
    <div className={s.page}>
      <div className={s.content}>{children}</div>
    </div>
  )
}
