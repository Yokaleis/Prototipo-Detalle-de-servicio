import React from 'react'
import { Outlet } from 'react-router-dom'
import { SidebarCopy } from '../components/SidebarCopy'

export const  MedicoLayout = () => {
  return (
    <div className="flex h-screen overflow-hidden bg-[#f0f2f5]">
      <SidebarCopy />
      <div className="flex-1 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  )
}

