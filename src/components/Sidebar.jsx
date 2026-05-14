import { useState } from 'react'
import {
  ChevronDown, ChevronUp, LogOut, Stethoscope,
  ClipboardList, Clock, Users, Bell
} from 'lucide-react'

const menuItems = [
  { label: 'Atenciones', active: true },
  { label: 'Médico', active: false, isSubActive: true },
  { label: 'Historial de atenciones', active: false },
  { label: 'Sala de espera', active: false },
]

export default function Sidebar() {
  const [atencionOpen, setAtencionOpen] = useState(true)

  return (
    <aside className="w-48 min-w-[192px] bg-white border-r border-gray-100 flex flex-col h-full shadow-sm">
      {/* Logo */}
      <div className="p-4 border-b border-gray-100 flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center">
          <span className="text-white text-xs font-bold">V</span>
        </div>
        <span className="text-xs font-semibold text-gray-500 tracking-widest uppercase">S.O.I.</span>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 px-2 space-y-1">
        {/* Servicios */}
        <div className="px-2 py-2 flex items-center justify-between cursor-pointer text-gray-500 hover:text-gray-700 text-sm font-medium select-none">
          <span>Servicios</span>
          <ChevronDown size={14} />
        </div>

        {/* Atenciones group */}
        <div>
          <div
            onClick={() => setAtencionOpen(v => !v)}
            className="px-2 py-2 flex items-center justify-between cursor-pointer text-teal-700 bg-teal-50 rounded-md text-sm font-semibold select-none"
          >
            <div className="flex items-center gap-2">
              <ClipboardList size={15} />
              <span>Atenciones</span>
            </div>
            {atencionOpen ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
          </div>

          {atencionOpen && (
            <div className="ml-4 mt-1 space-y-0.5">
              <div className="px-2 py-1.5 text-xs text-gray-500 cursor-pointer hover:text-gray-700 rounded-md hover:bg-gray-50 transition-colors">
                Atenciones
              </div>
              <div className="px-2 py-1.5 text-xs text-teal-700 font-semibold cursor-pointer rounded-md bg-teal-50">
                Médico
              </div>
              <div className="px-2 py-1.5 text-xs text-gray-500 cursor-pointer hover:text-gray-700 rounded-md hover:bg-gray-50 transition-colors">
                Historial de atenciones
              </div>
              <div className="px-2 py-1.5 text-xs text-gray-500 cursor-pointer hover:text-gray-700 rounded-md hover:bg-gray-50 transition-colors">
                Sala de espera
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-gray-100">
        <button className="w-full flex items-center gap-2 px-2 py-2 rounded-md text-xs text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors">
          <LogOut size={14} />
          <span>Cerrar sesión</span>
        </button>
      </div>
    </aside>
  )
}
