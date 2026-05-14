import Sidebar from './components/Sidebar'
import AtencionDetail from './components/AtencionDetail'
import { SidebarCopy } from './components/SidebarCopy'

export default function App() {
  return (
    <div className="flex h-screen overflow-hidden bg-[#f0f2f5]">
      <SidebarCopy />
      <div className="flex-1 overflow-y-auto">
        <AtencionDetail />
      </div>
    </div>
  )
}
