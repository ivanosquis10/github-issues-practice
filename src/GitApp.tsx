import { FC } from 'react'
import { Outlet } from 'react-router'
import { Header } from './issues/components/Header'

export const GitApp: FC = () => {
  return (
    <div className='overflow-hidden min-h-screen'>
      <Header />
      <Outlet />
    </div>
  )
}
